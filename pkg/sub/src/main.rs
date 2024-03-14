use actix_web::{App, HttpServer};
use sub::handlers::handle_sub;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    println!("Started sub server on port 9001");

    Ok(HttpServer::new(|| App::new().service(handle_sub))
        .bind(("0.0.0.0", 9001))?
        .run()
        .await?)
}
