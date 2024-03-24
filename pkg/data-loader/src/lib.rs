use actix_web::{post, web::Json, HttpResponse, Responder};
use rand::Rng;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
pub struct GenerateDataRequest {
    low: Option<i32>,
    high: Option<i32>,
}

#[derive(Serialize, Debug)]
pub struct GenerateDataResponse {
    x: i32,
    y: i32,
}

#[post("/gen")]
pub async fn handle_generate_data(req: Json<GenerateDataRequest>) -> impl Responder {
    println!("Got a request: {req:#?}");

    let (x, y) = generate_data(req.low, req.high);

    HttpResponse::Ok().json(GenerateDataResponse { x, y })
}

pub fn generate_data(low: Option<i32>, high: Option<i32>) -> (i32, i32) {
    let mut rng = rand::thread_rng();
    let low = low.unwrap_or(1);
    let high = high.unwrap_or(100);

    (rng.gen_range(low..high), rng.gen_range(low..high))
}
