use actix_web::{App, HttpServer};
use mul::handlers::handle_mul;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    println!("Started mul server on port 9002");

    Ok(HttpServer::new(|| App::new().service(handle_mul))
        .bind(("0.0.0.0", 9002))?
        .run()
        .await?)
}
