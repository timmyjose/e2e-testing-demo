pub mod handlers;

/// Divide the first number by the second
pub(crate) fn div(x: i32, y: i32) -> i32 {
    if y == 0 {
        0
    } else {
        x / y
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_div() {
        assert_eq!(div(12, 2), 6);
        assert_eq!(div(12, 0), 0);
    }
}
