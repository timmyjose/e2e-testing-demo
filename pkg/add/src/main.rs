use actix_web::{App, HttpServer};
use add::handlers::handle_add;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    println!("Started add server on port 9000");

    Ok(HttpServer::new(|| App::new().service(handle_add))
        .bind(("0.0.0.0", 9000))?
        .run()
        .await?)
}
