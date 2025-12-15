use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Request {
    method: String,
    url: String,
    headers: Vec<(String, String)>,
    body: String,
}

#[derive(Serialize, Deserialize)]
struct Response {
    status: u16,
    headers: Vec<(String, String)>,
    body: String,
}

#[tauri::command]
async fn request(request: Request) -> Result<Response, String> {
    // URL de tu backend real
    let url = request.url;

    // Creamos el cliente HTTP
    let client = reqwest::Client::new();

    // Hacemos la petición POST
    let res = client
        .post(url)
        .json(&request.body) // reqwest serializa automáticamente a JSON
        .send()
        .await
        .map_err(|e| e.to_string())?; // Convertimos error de red a String para Tauri

    // Verificamos si el status es 200 OK
    if res.status().is_success() {
        // Parseamos la respuesta JSON a nuestra estructura Rust
        let response_body = res
            .json::<Response>()
            .await
            .map_err(|e| e.to_string())?;

        Ok(response_body)
    } else {
        // Manejamos errores del servidor (ej. 400, 500)
        Err(format!("Error del servidor: {}", res.status()))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
