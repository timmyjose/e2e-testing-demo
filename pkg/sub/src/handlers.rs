use actix_web::{post, web::Json, Result};
use serde::{Deserialize, Serialize};

use crate::sub;

#[derive(Debug, Deserialize)]
struct SubRequest {
    x: i32,
    y: i32,
}

#[derive(Serialize)]
struct SubResponse {
    diff: i32,
}

#[post("/exec")]
pub async fn handle_sub(payload: Json<SubRequest>) -> Result<Json<SubResponse>> {
    println!("Got a request: {payload:#?}");

    let x = payload.x;
    let y = payload.y;

    Ok(Json(SubResponse { diff: sub(x, y) }))
}
