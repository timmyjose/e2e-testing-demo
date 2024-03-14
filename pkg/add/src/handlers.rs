use actix_web::{post, web::Json, Result};
use serde::{Deserialize, Serialize};

use crate::add;

#[derive(Debug, Deserialize)]
struct AddRequest {
    x: i32,
    y: i32,
}

#[derive(Serialize)]
struct AddResponse {
    sum: i32,
}

#[post("/exec")]
pub async fn handle_add(payload: Json<AddRequest>) -> Result<Json<AddResponse>> {
    println!("Received request: {payload:#?}");
    let x = payload.x;
    let y = payload.y;

    Ok(Json(AddResponse { sum: add(x, y) }))
}
