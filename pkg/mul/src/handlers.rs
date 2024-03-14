use actix_web::{post, web::Json, Result};
use serde::{Deserialize, Serialize};

use crate::mul;

#[derive(Debug, Deserialize)]
struct MulRequest {
    x: i32,
    y: i32,
}

#[derive(Serialize)]
struct MulResponse {
    prod: i32,
}

#[post("/exec")]
pub async fn handle_mul(payload: Json<MulRequest>) -> Result<Json<MulResponse>> {
    println!("Received request: {payload:#?}");
    let x = payload.x;
    let y = payload.y;

    Ok(Json(MulResponse { prod: mul(x, y) }))
}
