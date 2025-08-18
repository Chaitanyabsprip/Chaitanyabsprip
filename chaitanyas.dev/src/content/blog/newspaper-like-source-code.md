---
title: "Newspaper like source code"
subtitle: "Structure your file like a newspaper, but don't publish any news."
description: "How applying the inverted pyramid style of journalism to code organization improves readability, maintainability, and understanding of software."
pubDate: "2025-08-17"
---

Last week, a colleague asked me to help debug an issue in our codebase. Opening the file in question, I found myself scrolling up and down, again and again, piecing together fragments of understanding from functions scattered throughout the file. The main logic was buried somewhere in the middle, surrounded by helper functions whose purpose only became clear after multiple readings.

It wasn't that the code was poorly written – each function was well-documented and did its job. The problem was deeper: the file told its story in the wrong order.

Good writing starts with the most important information. Journalists have long used the 'inverted pyramid' style - leading with key points before diving into details. Each paragraph adds depth, but readers can stop anywhere and grasp the essence. It's a principle that has served journalists well for centuries. The headline captures the essence. The first paragraph summarizes the key points. Each subsequent paragraph adds detail and context. You can stop reading at any point and still understand the story – the deeper you go, the more you learn.
Why don't we write code this way?

Think about the last time you explored an unfamiliar codebase. You probably wanted to know: What does this code do? What's its purpose? Instead, you likely found yourself wading through implementation details, helper functions, and utility code before discovering the main intent. It's like picking up a newspaper and finding weather reports and stock prices on the front page, with the headline buried somewhere in the middle.

```python
def _parse_date(date_str):
    """Parse date string into datetime object."""
    return datetime.strptime(date_str, "%Y-%m-%d")


def _validate_data(data):
    """Validate input data format."""
    if not isinstance(data, dict):
        raise ValueError("Input must be a dictionary")
    if "date" not in data:
        raise ValueError("Input must contain date field")
    return data


def _transform_result(data):
    """Transform processed data into output format."""
    return {
        "processed_date": data["date"],
        "value": data["value"] * 2,
        "metadata": {
            "processed_at": datetime.now().isoformat()
        }
    }


def process_data(data):
    """Process the input data and return results."""
    validated_data = _validate_data(data)
    validated_data["date"] = _parse_date(validated_data["date"])
    return _transform_result(validated_data)
```

Look familiar? This is how many of us instinctively organize our code. We start with the building blocks and work our way up to the main functionality. It makes sense from a bottom-up construction perspective – but it's backwards for readers.

Now imagine finding this instead:

```python
def process_data(data):
    """Process the input data and return results."""
    validated_data = _validate_data(data)
    validated_data["date"] = _parse_date(validated_data["date"])
    return _transform_result(validated_data)


def _validate_data(data):
    """Validate input data format."""
    if not isinstance(data, dict):
        raise ValueError("Input must be a dictionary")
    if "date" not in data:
        raise ValueError("Input must contain date field")
    return data


def _parse_date(date_str):
    """Parse date string into datetime object."""
    return datetime.strptime(date_str, "%Y-%m-%d")


def _transform_result(data):
    """Transform processed data into output format."""
    return {
        "processed_date": data["date"],
        "value": data["value"] * 2,
        "metadata": {
            "processed_at": datetime.now().isoformat()
        }
    }
```

The file immediately tells you its purpose: it processes data. The main function appears first, giving you an overview of the workflow. The implementation details follow naturally, each helper function appearing as you need to understand it. The story unfolds gradually, like chapters in a book.

Unlike a newspaper though, your code shouldn't break any news to its reader. Good code is predictable and obvious - each function should do exactly what its name suggests, each module should serve a clear purpose. While newspapers thrive on surprises, code should be entirely unsurprising. The most elegant code is often the most obvious.

This isn't a new idea. Donald Knuth called it "Literate Programming" back in 1984, arguing that programs should be written as literature for humans first, with the computer's needs secondary. Robert C. Martin described it as "The Stepdown Rule" in Clean Code – each function should be followed by those at the next level of abstraction. The authors of Structure and Interpretation of Computer Programs called it "wishful thinking" – start with the high-level story, then fill in the details.

Some might protest: "But the compiler doesn't care about the order!" Exactly – and that's our opportunity. Since the compiler is indifferent to function ordering, we can arrange our code in whatever way serves human understanding best. We write code once, but read it countless times. If the machine doesn't care about the order, we might as well optimize for human comprehension.

Others worry about circular dependencies. Yet I've found the opposite: when you organize code in newspaper style, with clear layers of abstraction, circular dependencies become both obvious and rare. The public interface at the top creates a natural boundary. The implementation details, tucked away below, can change freely without affecting the main story.

This approach transcends programming paradigms. Whether you're writing functional, object-oriented, or procedural code, the principle remains: respect your reader's journey through the code. Start with the what, then reveal the how.

After years of writing and maintaining code, I've come to see this as more than an aesthetic choice. It's about empathy. Every source file is a story, and every story deserves to be told well. When we write code in newspaper style, we're not just making it easier to read – we're making it easier to understand, to maintain, to evolve.

The next time you write a piece of code, pause before you start typing. Ask yourself: If this were a news article, what would the headline be? What's the lead paragraph? How does the story unfold? Your future readers – including your future self – will thank you.

In the end, perhaps that's the most compelling reason to adopt this style: code is a form of communication, not just with the computer, but with other human beings. And like any good story, it deserves to be told in the right order.

---

_Further Reading:_

- [Knuth, D. E. (1984). "Literate Programming." _The Computer Journal_, 27(2), 97-111.](http://www.literateprogramming.com/knuthweb.pdf)
- Martin, R. C. (2008). _Clean Code: A Handbook of Agile Software Craftsmanship_. Prentice Hall.
- [Abelson, H., & Sussman, G. J. (1996). _Structure and Interpretation of Computer Programs_. MIT Press.](https://web.mit.edu/6.001/6.037/sicp.pdf)
