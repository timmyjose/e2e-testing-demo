pub mod handlers;

/// Multiply two numbers
pub(crate) fn mul(x: i32, y: i32) -> i32 {
    x * y
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mul() {
        assert_eq!(mul(12, 2), 24);
    }
}
