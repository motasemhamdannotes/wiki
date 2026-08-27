

🏠 [Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)

# Vim : Command Reference Notes

## 01 · Cursor Movement

### Character & Word Movement

|Key|Action|
|---|---|
|`h`|Move left|
|`j`|Move down|
|`k`|Move up|
|`l`|Move right|
|`w`|Jump to start of next word (punctuation = word boundary)|
|`W`|Jump to start of next word (spaces only as boundary)|
|`e`|Jump to end of word (punctuation = word boundary)|
|`E`|Jump to end of word (no punctuation boundary)|
|`b`|Jump backward by word (punctuation = boundary)|
|`B`|Jump backward by word (spaces only as boundary)|
|`ge`|Jump backward to end of previous word|
|`gE`|Jump backward to end of previous word (punctuation allowed)|

### Line Movement

|Key|Action|
|---|---|
|`0`|Start of line (column zero)|
|`^`|First non-blank character of line|
|`$`|End of line|
|`g_`|Last non-blank character of line|
|`-`|Move up one line, land on first non-blank character|
|`+` / `<Enter>`|Move down one line, land on first non-blank character|

### File-Level Movement

|Key|Action|
|---|---|
|`gg`|Go to first line|
|`G`|Go to last line|
|`ngg` / `nG`|Go to line `n`|
|`:n`|Go to line `n`|

### Sentence, Paragraph & Section Movement

|Key|Action|
|---|---|
|`)`|Move forward one sentence|
|`(`|Move backward one sentence|
|`}`|Move forward one paragraph|
|`{`|Move backward one paragraph|
|`]]`|Move forward one section or to next `{`|
|`[[`|Move backward one section or to previous `{`|

### Screen-Relative Movement

|Key|Action|
|---|---|
|`H`|Move cursor to top of screen|
|`M`|Move cursor to middle of screen|
|`L`|Move cursor to bottom of screen|

### In-Line Search

|Key|Action|
|---|---|
|`fx`|Search forward on line for character `x`|
|`Fx`|Search backward on line for character `x`|
|`tx`|Search forward on line, stop before `x`|
|`Tx`|Search backward on line, stop before `x`|

### Scrolling

|Key|Action|
|---|---|
|`CTRL-y`|Scroll screen up one line (cursor stays)|
|`CTRL-e`|Scroll screen down one line (cursor stays)|
|`CTRL-u`|Scroll up half a page|
|`CTRL-d`|Scroll down half a page|
|`CTRL-b`|Scroll up one full page|
|`CTRL-f`|Scroll down one full page|

### View Centering

|Key|Action|
|---|---|
|`zz`|Shift current line to middle of screen|
|`z.`|Same as `zz` but jump to first non-blank character|
|`zt`|Shift current line to top of screen|
|`zb`|Shift current line to bottom of screen|

---

## 02 · Bookmarks & Jumps

|Key|Action|
|---|---|
|`:marks`|List all current marks|
|`ma`|Set bookmark `a` at current cursor position|
|`` `a ``|Jump to exact position of bookmark `a`|
|`'a`|Jump to the line containing bookmark `a`|
|`` `0 ``|Jump to position where Vim was last exited|
|`` `" ``|Jump to position when last editing this file|
|`` `. ``|Jump to last edited line|
|` `` `|Jump to position before last jump|
|`g,`|Go to newer position in change list|
|`g;`|Go to older position in change list|

> **Tip:** Backtick (`` ` ``) jumps to the exact mark position; apostrophe (`'`) jumps to the first non-blank character of the mark's line.

---

## 03 · Insert Mode

|Key|Action|
|---|---|
|`i`|Start insert mode at cursor|
|`I`|Insert at beginning of line|
|`gi`|Return to insert mode at last insertion point|
|`gI`|Insert at column 1 (always)|
|`a`|Append after cursor|
|`A`|Append at end of line|
|`o`|Open blank line below current line and enter insert mode|
|`O`|Open blank line above current line and enter insert mode|
|`CTRL-o`|Temporarily enter normal mode for one command (while in insert mode)|
|`Esc`|Exit insert mode|

---

## 04 · Editing

### Replace & Join

|Key|Action|
|---|---|
|`r`|Replace single character under cursor (stays in normal mode)|
|`R`|Enter Replace mode (overwrite characters)|
|`J`|Join line below to current line with one space|
|`gJ`|Join line below to current line without space|

### Change Commands (cuts text and enters insert mode)

|Key|Action|
|---|---|
|`cc`|Change entire line|
|`cw` / `ce`|Change to end of word|
|`2cw`|Change two words|
|`ciw`|Change word under cursor (inner word)|
|`caw`|Change word under cursor including surrounding space|
|`ci"`|Change text inside double quotes|
|`cit`|Change HTML tag content (inner tag)|
|`cat`|Change HTML tag including the tags themselves|
|`cis`|Change sentence under cursor|
|`cas`|Change sentence including surrounding space|
|`cib`|Change inside `()` block|
|`cab`|Change `()` block including parentheses|
|`ciB`|Change inside `{}` block|
|`caB`|Change `{}` block including braces|
|`C` / `c$`|Change to end of line|
|`cG`|Change from cursor to end of file|
|`cgg`|Change from first line to cursor|
|`ct'`|Change until the `'` character (replace `'` with any target character)|
|`s`|Delete character at cursor and substitute text|
|`S` / `cc`|Delete entire line and substitute|

### Undo & Redo

|Key|Action|
|---|---|
|`u`|Undo|
|`CTRL-r`|Redo|
|`.`|Repeat last command|

### Case & Indentation

|Key|Action|
|---|---|
|`~`|Switch case of character under cursor|
|`g~iw`|Switch case of current word|
|`gUiw`|Uppercase current word|
|`guiw`|Lowercase current word|
|`gU$`|Uppercase to end of line|
|`gu$`|Lowercase to end of line|
|`>>`|Indent line one level right|
|`<<`|Indent line one level left|
|`>i{`|Indent everything inside `{}`|
|`==`|Auto-indent current line|

### Line Swapping

|Key|Action|
|---|---|
|`ddp`|Swap current line with next|
|`ddkP`|Swap current line with previous|
|`xp`|Transpose two characters (delete and paste)|

### Misc Editing Commands

|Key|Action|
|---|---|
|`:%retab`|Fix mixed spaces/tabs throughout file|
|`:r [name]`|Insert file `[name]` below cursor|
|`:r !{cmd}`|Execute `{cmd}` and insert its output below cursor|

---

## 05 · Deleting Text

All delete operations cut to the default register (can be pasted with `p`).

|Key|Action|
|---|---|
|`x`|Delete character under cursor|
|`X`|Delete character before cursor|
|`dw` / `de`|Delete to end of word|
|`diw`|Delete word under cursor (inner word)|
|`daw`|Delete word under cursor including surrounding space|
|`dap`|Delete a paragraph|
|`dd`|Delete entire line|
|`dt'`|Delete until next `'` character (replace `'` with any character)|
|`dG`|Delete from cursor to end of file|
|`dgg`|Delete from first line to cursor|
|`D` / `d$`|Delete from cursor to end of line|
|`:[range]d`|Delete `[range]` lines|

---

## 06 · Copying & Moving Text

### Basic Yank & Paste

|Key|Action|
|---|---|
|`yw`|Yank word|
|`yy`|Yank (copy) current line|
|`2yy`|Yank 2 lines|
|`y$`|Yank to end of line|
|`p`|Paste after cursor / current line|
|`P`|Paste before cursor / current line|
|`gp`|Paste after cursor; leave cursor after pasted text|
|`gP`|Paste before cursor; leave cursor after pasted text|

### System Clipboard

|Key|Action|
|---|---|
|`"+y`|Yank into system clipboard register|
|`"+p`|Paste from system clipboard register|
|`:set paste`|Avoid unexpected effects when pasting from external clipboard|

### Named Registers

|Key|Action|
|---|---|
|`:registers`|Display contents of all registers|
|`"xyw`|Yank word into register `x`|
|`"xyy`|Yank line into register `x`|
|`:[range]y x`|Yank `[range]` lines into register `x`|
|`"xp`|Paste from register `x` after cursor|
|`"xP`|Paste from register `x` before cursor|
|`"xgp`|Paste from register `x` after cursor; leave cursor after pasted text|
|`"xgP`|Paste from register `x` before cursor; leave cursor after pasted text|
|`:[line]put x`|Paste from register `x` after `[line]`|

> **VS Code tip:** Add `"vim.useSystemClipboard": true` in `settings.json` to use the system clipboard for the unnamed register.

---

## 07 · Macros

|Key|Action|
|---|---|
|`qa`|Start recording macro into register `a`|
|`q`|Stop recording macro|
|`@a`|Replay macro `a`|
|`@:`|Replay last Ex command|
|`@@`|Repeat last replayed macro|

---

## 08 · Visual Mode

### Entering Visual Mode

|Key|Action|
|---|---|
|`v`|Start character-wise visual mode|
|`V`|Start line-wise visual mode|
|`CTRL-v`|Start block (column) visual mode|
|`Esc`|Exit visual mode|
|`gv`|Reselect last visual selection|

### Navigation in Visual Mode

|Key|Action|
|---|---|
|`o`|Move to other end of selection|
|`O`|Move to other corner of block (block mode)|

### Text Objects in Visual Mode

|Key|Selects|
|---|---|
|`aw`|A word (including surrounding whitespace)|
|`ab`|A `()` block including parentheses|
|`aB`|A `{}` block including braces|
|`at`|A `<>` block including tags|
|`ib`|Inner `()` block|
|`iB`|Inner `{}` block|
|`it`|Inner `<>` block|

### Visual Mode Commands

|Key|Action|
|---|---|
|`>`|Shift selected text right|
|`<`|Shift selected text left|
|`c`|Change (replace) marked text|
|`y`|Yank (copy) marked text|
|`d`|Delete marked text|
|`~`|Switch case of marked text|
|`U`|Uppercase marked text|

### Visual Mode Shortcuts

|Key|Action|
|---|---|
|`v%`|Select to matching parenthesis|
|`vi{`|Select inside matching curly braces|
|`vi"`|Select text between double quotes|
|`vi'`|Select text between single quotes|

---

## 09 · Spelling

```bash
# Enable spell checking
:set spell
:set spell spelllang=en_us

# Disable spell checking
:set nospell
```

|Key|Action|
|---|---|
|`]s`|Jump to next misspelled word|
|`[s`|Jump to previous misspelled word|
|`zg`|Add word under cursor to wordlist (mark as good)|
|`zug`|Undo last `zg` add|
|`z=`|Show spelling suggestions for word under cursor|

---

## 10 · Exiting

|Command|Action|
|---|---|
|`:q`|Quit — fails if unsaved changes exist|
|`:q!`|Quit without saving (discard changes)|
|`:cq`|Quit unconditionally, returning a non-zero exit code|
|`:w`|Save without exiting|
|`:wq`|Save and exit|
|`:wq!`|Save and exit (even if file is read-only)|
|`:wq {file}`|Write to `{file}` and exit|
|`:wq! {file}`|Write to `{file}` and exit always|
|`:[range]wq[!]`|Write only `[range]` lines and exit|
|`ZZ`|Write file if modified, then exit (same as `:wq`)|
|`ZQ`|Quit without writing (same as `:q!`)|

---

## 11 · Search & Replace

### Search

|Key|Action|
|---|---|
|`/pattern`|Search forward for `pattern`|
|`?pattern`|Search backward for `pattern`|
|`n`|Repeat search in same direction|
|`N`|Repeat search in opposite direction|
|`*`|Search forward for word under cursor|
|`#`|Search backward for word under cursor|
|`:set ic`|Enable case-insensitive search|
|`:set noic`|Disable case-insensitive search (restore case sensitivity)|

### Replace

|Command|Action|
|---|---|
|`:%s/old/new/g`|Replace all occurrences of `old` with `new` in the whole file|
|`:%s/old/new/gc`|Replace all with confirmation prompt for each occurrence|
|`:argdo %s/old/new/gc \| wq`|Open multiple files and replace in each, then save and quit|

---

## 12 · Multiple Files & Buffers

|Command|Action|
|---|---|
|`:e filename`|Open file in a new buffer|
|`:tabe filename`|Open file in a new tab|
|`:ls`|List all open buffers|
|`:bn`|Go to next buffer|
|`:bp`|Go to previous buffer|
|`:bd`|Delete (close) current buffer|
|`:b1`|Switch to buffer 1|
|`:b vimrc`|Switch to buffer whose filename starts with `vimrc`|
|`:bufdo <cmd>`|Run `cmd` in all open buffers|
|`:[range]bufdo <cmd>`|Run `cmd` in buffers within `range`|

---

## 13 · Windows & Splits

### Opening Splits

|Command|Action|
|---|---|
|`:sp f`|Open file `f` in a horizontal split|
|`:vsp f`|Open file `f` in a vertical split|
|`CTRL-w s`|Split current window horizontally|
|`CTRL-w v`|Split current window vertically|
|`CTRL-w q`|Close current window|
|`CTRL-w o`|Close all other windows|

### Navigating Between Windows

|Key|Action|
|---|---|
|`CTRL-w w`|Cycle to next window|
|`CTRL-w h`|Move to left window|
|`CTRL-w j`|Move to window below|
|`CTRL-w k`|Move to window above|
|`CTRL-w l`|Move to right window|
|`CTRL-w x`|Swap current window with next|

### Resizing Windows

|Key|Action|
|---|---|
|`CTRL-w +`|Increase window height|
|`CTRL-w -`|Decrease window height|
|`CTRL-w <`|Increase window width|
|`CTRL-w >`|Decrease window width|
|`CTRL-w =`|Equalise all window sizes|

---

## 14 · Quickfix Window

The quickfix window is used for compiler errors, grep results, and other tool output.

|Command|Action|
|---|---|
|`copen`|Open quickfix window|
|`cclose`|Close quickfix window|
|`cc [nr]`|Display error `[nr]`|
|`cfirst`|Jump to first error|
|`clast`|Jump to last error|
|`[count]cn`|Jump to `[count]` next error|
|`[count]cp`|Jump to `[count]` previous error|

---

## 15 · Programming

|Key / Command|Action|
|---|---|
|`%`|Jump to matching brace, bracket, or parenthesis|
|`gf`|Open the file whose name is under the cursor|
|`gF`|Open the file under cursor and jump to the line number|
|`gd`|Jump to declaration of local variable or function under cursor|
|`''`|Return to line before last jump|
|`CTRL-o`|Move to previous location in jump list|
|`CTRL-i`|Move to more recent location in jump list|
|`:set nu`|Show line numbers|
|`:set nonu`|Hide line numbers|

---

## 16 · Plugins

### Ack (Recursive Search)

|Key / Command|Action|
|---|---|
|`:Ack`|Search recursively in the current directory|
|`o`|Open result file|
|`go`|Preview result file (keep focus on results)|
|`t`|Open in new tab|
|`T`|Open in new tab silently|
|`q`|Close quickfix window|

### NERDTree (File Browser)

```vim
:NERDTreeToggle     " show / hide the file browser
:NERDTreeFind       " reveal current file in browser
:Bookmark name      " bookmark current node as 'name'
```

**File actions:**

|Key|Action|
|---|---|
|`o`|Open in previous window|
|`go`|Preview file|
|`t`|Open in new tab|
|`T`|Open in new tab silently|
|`i`|Open in horizontal split|
|`gi`|Preview in horizontal split|
|`s`|Open in vertical split|
|`gs`|Preview in vertical split|

**Directory actions:**

|Key|Action|
|---|---|
|`o`|Toggle open/close directory node|
|`O`|Recursively open directory|
|`x`|Close parent node|
|`X`|Close all child nodes recursively|
|`e`|Explore selected directory|

**Tree navigation:**

|Key|Action|
|---|---|
|`P`|Go to root node|
|`p`|Go to parent node|
|`K`|Go to first child|
|`J`|Go to last child|
|`CTRL-j`|Go to next sibling|
|`CTRL-k`|Go to previous sibling|

**Filesystem:**

|Key|Action|
|---|---|
|`C`|Change tree root to selected directory|
|`u`|Move tree root up one directory|
|`U`|Move tree root up, but keep old root open|
|`r`|Refresh current directory|
|`R`|Refresh root|
|`m`|Show filesystem menu|
|`cd`|Change CWD to selected directory|

**Filtering:**

|Key|Toggles|
|---|---|
|`I`|Hidden files|
|`f`|File filters|
|`F`|Files|
|`B`|Bookmarks|

**Other:**

|Key|Action|
|---|---|
|`q`|Close NERDTree window|
|`A`|Maximise/minimise NERDTree window|
|`?`|Toggle help|

### vim-fugitive (Git Integration)

|Command|Action|
|---|---|
|`:Git`|Run any git command|
|`:Gstatus`|Git status (`-` to stage/unstage, `p` to patch, `C` to commit)|
|`:Gcommit`|Git commit|
|`:Gread`|Revert buffer to last commit|
|`:Gwrite`|Write file and stage changes|
|`:Gmove`|Git mv|
|`:Gremove`|Git rm|
|`:Glog`|Git log|
|`:Gdiff`|vimdiff against a revision|
|`:Gblame`|Open blame in a scroll-bound vertical split|
|`:Gbrowse`|Open file on GitHub|

### Surround

|Key|Action|
|---|---|
|`cs'"`|Change surrounding `'` to `"`|
|`cs(}`|Change surrounding `(` to `}`|
|`cs({`|Change surrounding `(` to `{` with space|
|`ds'`|Delete surrounding `'`|
|`dst`|Delete surrounding HTML tags|
|`ysiw[`|Surround inner word with `[`|
|`vees'`|Surround 2 words (motion `ee`) with `'`|

### NERDCommenter

|Key|Action|
|---|---|
|`<leader>cc`|Comment out selected line(s)|
|`<leader>c<space>`|Toggle comment state of selected line(s)|

### Tabular (Alignment)

|Command|Action|
|---|---|
|`:Tabularize /,`|Align selected lines on commas|

### Unimpaired

|Key|Action|
|---|---|
|`[space`|Add blank line above|
|`]space`|Add blank line below|
|`[e`|Exchange line with line above|
|`]e`|Exchange line with line below|
|`[x` / `]x`|XML encode / XML decode|
|`[q` / `]q`|Jump to previous / next quickfix item|
|`[Q` / `]Q`|Jump to first / last quickfix item|

### Taglist

|Key / Command|Action|
|---|---|
|`:TlistToggle`|Open / close taglist window|
|`<Enter>`|Jump to tag or file|
|`<Space>`|Display tag prototype|

### Gundo

|Command|Action|
|---|---|
|`:GundoToggle`|Show undo tree|

### SnipMate

|Key|Action|
|---|---|
|`<Tab>`|Expand snippet|

### Sparkup (Zen Coding)

|Key|Action|
|---|---|
|`CTRL-e`|Execute Sparkup expansion|
|`CTRL-n`|Jump to next empty tag or attribute|

### Vim-Markdown-Preview

|Command|Action|
|---|---|
|`:Mm`|Preview Markdown document in web browser|

### Miscellaneous Plugins

|Command / Key|Action|Plugin|
|---|---|---|
|`:Ack`|Recursive directory search|Ack|
|`:Cheat`|Open cheat sheet (with autocomplete)|Cheat|
|`<leader>ch`|Open cheat sheet for word under cursor|Cheat|
|`:Gist`|Post buffer to Gist|Gist|
|`:Gist XXXXX`|Fetch Gist XXXXX|Gist|
|`:Gist -l`|List your Gists|Gist|
|`CTRL-P`|Generate PHP docblock|PDV|
|`:PickHEX`|Open system colour picker|PickAColor|
|`<Leader>lj`|Show open buffers|LustyJuggler|

---

## 17 · Personal .vimrc Mappings

### Core Workflow

|Key|Action|
|---|---|
|`<leader>ev`|Edit `.vimrc` file|
|`<leader>sv`|Reload `.vimrc` file|
|`<leader>sh`|Show syntax highlighting groups for word under cursor|
|`jj`|Exit insert mode (alternative to `Esc`)|
|`<Space>`|Page down|
|`<leader>q`|Close current window|
|`<leader>/`|Clear search register (stop highlighting)|

### Display Toggles

|Key|Action|
|---|---|
|`<leader>h`|Toggle hidden characters display|
|`<F2>`|Toggle text wrapping|
|`:Wrap`|Wrap text|
|`<F3>`|Toggle spell check|
|`<F4>`|Toggle light / dark background|

### Underline Shortcuts

|Key|Action|
|---|---|
|`<F5>`|Underline current line with dashes|
|`<F6>`|Underline current line with double lines|

### Window Navigation

|Key|Action|
|---|---|
|`CTRL-h`|Go to left window|
|`CTRL-j`|Go to window below|
|`CTRL-k`|Go to window above|
|`CTRL-l`|Go to right window|
|`<leader>w`|Open vertical split and activate it|

### File & Directory Shortcuts

|Key|Action|
|---|---|
|`%%`|Expand to current file's directory|
|`##`|Expand to webroot|
|`<leader>ew`|Open file from current directory|
|`<leader>es`|Open file in split from current directory|
|`<leader>cd`|Change directory to parent of current file|

### Formatting

|Key|Action|
|---|---|
|`<leader>W`|Strip all trailing whitespace|
|`<leader><Up>`|Bubble line(s) up|
|`<leader><Down>`|Bubble line(s) down|
|`CTRL-<Space>`|Show omnicomplete menu|
|`<leader>b`|Surround with `<strong>` tags|
|`<leader>i`|Surround with `<em>` tags|

### Tags

|Key|Action|
|---|---|
|`:Ltag`|Load tags file|
|`:Project`|CD to project and load tags file|
|`<leader>t`|Show tag for word under cursor|
|`<leader>st`|Show tag in split window|
|`<leader>tj`|Show tag list for word under cursor|
|`<leader>stj`|Show tag list in split window|

### Tool Shortcuts

|Key|Action|
|---|---|
|`<leader>a`|Run Ack|
|`<leader>md`|Preview Markdown|
|`<leader>s`|Preview in Safari|
|`<leader>x`|Open colour picker|
|`<leader>g`|Toggle Gundo window|
|`CTRL-p`|Generate PHP docblock|
|`CTRL-<Tab>`|Switch between buffers|
|`CTRL-y`|Go to next tag/attribute (Sparkup)|

### NERDTree

|Key|Action|
|---|---|
|`<leader>n`|Toggle NERDTree|
|`<leader>N`|Close NERDTree|
|`<leader>f`|Find current file in NERDTree|

### Taglist

|Key|Action|
|---|---|
|`<leader>l`|Toggle Taglist|
|`<leader>L`|Close Taglist|

### Misc

|Key|Action|
|---|---|
|`<leader>ph`|Set filetype to `php.html`|
|`<leader>r`|Reload all SnipMate snippets|
|`IMG<CR>`|Open image browser to insert `<img>` tag with `src`, `width`, `height`|

---
