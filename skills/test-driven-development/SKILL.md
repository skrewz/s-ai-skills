---
name: test-driven-development
description: >-
  Test-Driven Development practices. Use when starting a new feature, designing
  how components collaborate, or when you need to grow code in small verifiable
  steps with confidence.
---

# Test-Driven Development

## The Red-Green-Refactor cycle

### 1. Red — write a failing test

Write the smallest test that expresses the next bit of behaviour. One test at a time.

```python
def test_addition():
    assert add(2, 3) == 5
```

The test must fail for the right reason — missing code or wrong value, not a syntax error.
If the test doesn't fail, you cannot trust it.

### 2. Green — make the test pass

Write the minimum code needed. Hard-code values if necessary.

```python
def add(a, b):
    return 5
```

Do not refactor during this phase. Getting green is the only goal.

### 3. Refactor — improve the design

Temporarily go back to red by introducing another case (e.g. an edge case):

```python
def test_addition_two():
    assert add(0, 3) == 3
```

This motivates the refactor:

```python
def add(a, b):
    return a + b
```

Remove duplication, rename for clarity, extract methods — only if tests stay green.

## Outside-in TDD (preferred approach)

Start from the user-visible boundary and work inward.

1. Write a test at the outermost layer (controller, CLI, API endpoint)
2. The test fails — implement just enough to compile/run
3. The next failure reveals what collaborator you need
4. Write a test for that collaborator's interface
5. Repeat until you reach the innermost logic

```text
Test: User calls API → expects response          (outermost)
    ↓ fails: no handler exists
Test: Handler calls Service → expects result     (middle layer)
    ↓ fails: no service exists
Test: Service calls Repository → expects data    (innermost)
    ↓ fails: no repository exists
Test: Repository returns mock data               (stub)
    ↑ green — now work back outward
```

## Triangulation

Add multiple test cases to force the obvious implementation.

```python
def test_add_positive():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 10) == 10

# Obvious implementation:
def add(a, b):
    return a + b
```

## Small steps

Take smaller steps than you think you need to.

| Confidence level | Step size |
|-----------------|-----------|
| Not sure what to do | Very small — one assertion, one line of code |
| Reasonably confident | Small — one test case, one method |
| Very confident | Larger — but still one logical unit |

## Test naming conventions

Name tests to document behaviour, not implementation:

```python
test_user_cannot_login_with_expired_token()
test_discount_applied_when_cart_exceeds_threshold()
test_empty_input_returns_default_value()
```

Use Arrange-Act-Assert (Given-When-Then) structure:

```python
def test_user_cannot_login_with_expired_token():
    # Arrange
    user = create_user_with_token(expired=True)

    # Act
    result = login(user)

    # Assert
    assert result.error == "Token expired"
```

## Common pitfalls

| Pitfall | Remedy |
|---------|--------|
| Writing too much code before running tests | Run tests after every small change |
| Testing implementation details | Ask: "Would I still need this test if I refactored the internals?" |
| Brittle tests | Test public interfaces; use fixtures |
| Skipping the red phase | If the test hasn't failed: delete the too-soon implementation and verify the test fails |
| Refactoring without green tests | Run the full suite before and after |

