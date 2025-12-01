use std::collections::HashMap;
use serde_json::Value;

#[tauri::command]
fn send_request(method: &str, url: &str, headers: HashMap<&str, &str>, body: Option<Value>) {
    println!("Hello, {}! You've been greeted from    Rust!", method);
    println!("URL: {}", url);
    println!("Headers: {:#?}", headers);
    println!("Body: {:#?}", body);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![send_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
