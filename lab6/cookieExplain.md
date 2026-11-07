# How the Saved Comment Code Works

This JavaScript code **restores a previously submitted comment from a browser cookie** and displays it in the comments list when the page loads. It does not submit a new comment or save a new cookie.

## The code

```javascript
const savedCookie = document.cookie
    .split("; ")
    .find(c => c.startsWith("comment="));

if (savedCookie) {
    const savedComment = decodeURIComponent(
        savedCookie.substring("comment=".length)
    );

    const li = document.createElement("li");
    li.classList.add("user-comment");
    li.textContent = savedComment;
    commentsList.appendChild(li);
}
```

## Step-by-step explanation

### 1. Read and separate the cookies

```javascript
const savedCookie = document.cookie
    .split("; ")
    .find(c => c.startsWith("comment="));
```

- `document.cookie` returns the cookies accessible to the current page as a string.
- `.split("; ")` separates that string into an array of individual `name=value` entries.
- `.find(c => c.startsWith("comment="))` returns the first entry whose name is `comment`.
- If no matching entry exists, `savedCookie` is `undefined`.

For example, if the cookies are:

```text
vote=like; comment=Hello%20World
```

Then `savedCookie` becomes:

```text
comment=Hello%20World
```

### 2. Check whether a cookie was found

```javascript
if (savedCookie) {
    // ...
}
```

The code inside the `if` block runs only if a matching cookie entry was found. This avoids trying to read a missing cookie.

**Note:** `comment=` (an empty cookie value) still passes this check because the whole string `comment=` is not empty.

### 3. Extract and decode the saved text

```javascript
const savedComment = decodeURIComponent(
    savedCookie.substring("comment=".length)
);
```

- `"comment=".length` is `8`.
- `.substring(8)` removes the first eight characters (`comment=`), leaving only the stored value.
- `decodeURIComponent()` converts URL-encoded characters back into readable text. For example, `Hello%20World` becomes `Hello World`.

### 4. Create a new list item

```javascript
const li = document.createElement("li");
```

Creates a new HTML `<li>` element in memory. It is not yet displayed on the page.

### 5. Mark it as a user comment

```javascript
li.classList.add("user-comment");
```

Adds the CSS class `user-comment` to the new element. This lets your reset button remove only submitted comments while keeping the original HTML comments:

```javascript
commentsList.querySelectorAll("li.user-comment").forEach(li => li.remove());
```

### 6. Put the text inside the list item

```javascript
li.textContent = savedComment;
```

Sets the list item's text to the restored comment. `textContent` treats the comment as plain text, not HTML.

### 7. Display the comment

```javascript
commentsList.appendChild(li);
```

Adds the `<li>` to your existing `<ul id="comments">`, so the saved comment appears on the page.

## Example

Suppose your HTML initially contains:

```html
<ul id="comments">
    <li>Comment 1</li>
    <li>Comment 2</li>
</ul>
```

And your browser has this cookie:

```text
comment=Hello%20World
```

After the JavaScript runs, the list becomes:

```html
<ul id="comments">
    <li>Comment 1</li>
    <li>Comment 2</li>
    <li class="user-comment">Hello World</li>
</ul>
```

## Important notes

- This code should run **outside** the Submit button's click listener, so it executes when the page loads.
- It restores **one saved comment** from the `comment` cookie, not a collection of comments.
- It does not prevent duplicate submissions by itself. That check belongs in the Submit button's event listener.
- Use `path=/` consistently when setting and deleting the cookie to avoid creating cookies with the same name under different paths.
