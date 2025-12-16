use reqwest::{header::{HeaderName, HeaderValue}, Client, Method};
use serde::{Deserialize, Serialize};
use std::str::FromStr; // Necesario para parsear el string del método

// Estructura de la Petición que viene desde el Frontend
#[derive(Serialize, Deserialize)]
pub struct RequestData {
    pub method: String,
    pub url: String,
    pub headers: Option<Vec<(String, String)>>, // Hacemos los headers opcionales
    pub body: Option<String>,
}

// Estructura de la Respuesta que se envía de vuelta al Frontend
#[derive(Serialize, Deserialize, Debug)]
pub struct ResponseData {
    pub status: u16,
    pub status_text: String,
    pub headers: Vec<(String, String)>,
    pub body: String,
}

#[tauri::command]
async fn request(request: RequestData) -> Result<ResponseData, String> {
    // 1. Validar y parsear el método HTTP
    let method = Method::from_str(&request.method.to_uppercase())
        .map_err(|_| format!("Método HTTP inválido: {}", request.method))?;

    let client = Client::new();

    // 2. Crear el constructor de la petición con el método y URL correctos
    // USAR .clone() AQUÍ
    let mut req_builder = client.request(method.clone(), &request.url); // <--- SOLUCIÓN CLAVE

    // 3. Agregar headers si existen
    if let Some(headers) = request.headers {
        for (key, value) in headers {
            if let (Ok(h_name), Ok(h_value)) = (
                HeaderName::from_str(&key),
                HeaderValue::from_str(&value),
            ) {
                req_builder = req_builder.header(h_name, h_value);
            }
        }
    }

    // 4. Aplicar el cuerpo si existe (solo para métodos que lo permiten)
    if let Some(body) = request.body {
        if !body.is_empty() 
            // El uso de 'method' aquí ahora es válido porque se usó una copia (clone) antes
            && (method == Method::POST || method == Method::PUT || method == Method::PATCH || method == Method::DELETE) 
        {
            // Nota: Agregué DELETE, que también puede llevar cuerpo
            req_builder = req_builder.body(body);
        }
    }

    // 5. Ejecutar la petición
    let res = req_builder.send().await.map_err(|e| e.to_string())?;

    // 6. Obtener el estado y el cuerpo antes de consumirlos
    let status_code = res.status();
    let status_text = status_code
        .canonical_reason()
        .unwrap_or("Unknown")
        .to_string();

    // 7. Recolectar todos los headers de la respuesta
    let response_headers: Vec<(String, String)> = res
        .headers()
        .iter()
        .map(|(name, value)| (name.to_string(), value.to_str().unwrap_or("").to_string()))
        .collect();

    // 8. Leer el cuerpo de la respuesta como String
    let body_text = res.text().await.map_err(|e| e.to_string())?;


    println!("Body: {}", body_text);
    // 9. Construir y devolver la estructura ResponseData
    Ok(ResponseData {
        status: status_code.as_u16(),
        status_text: status_text,
        headers: response_headers,
        body: body_text,
    })
}

// Función main (sin cambios, solo asegurando la referencia a la nueva función)
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}