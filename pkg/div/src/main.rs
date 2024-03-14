use actix_web::{App, HttpServer};
use div::handlers::handle_div;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    println!("Started add server on port 9003");

    Ok(HttpServer::new(|| App::new().service(handle_div))
        .bind(("0.0.0.0", 9003))?
        .run()
        .await?)
}
