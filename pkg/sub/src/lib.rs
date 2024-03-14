pub mod handlers;

/// Subtract the second number from the first
pub(crate) fn sub(x: i32, y: i32) -> i32 {
    x - y
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sub() {
        assert_eq!(sub(1, 2), -1);
    }
}
