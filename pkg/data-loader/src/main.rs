use actix_web::{App, HttpServer};
use clap::Parser;
use data_loader::{generate_data, handle_generate_data};
use std::env;

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Cli {
    low: Option<i32>,
    high: Option<i32>,
}

#[tokio::main]
async fn start_web_server() -> eyre::Result<()> {
    println!("Starting data loader web server on 0.0.0.0:8888");

    Ok(HttpServer::new(|| App::new().service(handle_generate_data))
        .bind(("0.0.0.0", 8888))?
        .run()
        .await?)
}

fn main() -> eyre::Result<()> {
    // read the env and see if ENV_NAME=test is specified
    if let Ok(env_name) = env::var("ENV_NAME") {
        if env_name == "e2e" {
            start_web_server()?
        }
    }

    let cli = Cli::parse();

    let (x, y) = generate_data(cli.low, cli.high);
    println!("x = {x}, y = {y}");

    Ok(())
}
