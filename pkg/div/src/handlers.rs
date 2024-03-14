use actix_web::{post, web::Json, Result};
use serde::{Deserialize, Serialize};

use crate::div;

#[derive(Debug, Deserialize)]
struct DivRequest {
    x: i32,
    y: i32,
}

#[derive(Serialize)]
struct DivResponse {
    quot: i32,
}

#[post("/exec")]
pub async fn handle_div(payload: Json<DivRequest>) -> Result<Json<DivResponse>> {
    println!("Received request: {payload:#?}");
    let x = payload.x;
    let y = payload.y;

    Ok(Json(DivResponse { quot: div(x, y) }))
}
