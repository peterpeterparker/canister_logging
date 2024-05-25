#[ic_cdk::query]
fn greet(name: String) -> String {
    ic_cdk::print(format!("Hello, {}!", name));

    ic_cdk::trap("Hello trap")
}
