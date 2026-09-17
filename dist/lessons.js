export const lessons = [
  {
    "id": "comments",
    "group": "FOUNDATIONS",
    "title": "Comments explain the code",
    "verb": "#42:comments",
    "body": "<p>Start by clicking Run Code. Read the feedback, edit the code, and run again. Restore Example brings back the starter code.</p><p>World lets you inspect objects; Load lesson starting world offers a prepared starting state after confirmation.</p><p>A standalone quoted string followed by a semicolon is a MOO comment: <code>\"A note for the reader.\";</code>. It explains the code without printing anything. Keep the quotes and the final semicolon.</p><p>A string inside <code>player:tell(\"Hello from MOO!\");</code> is an argument to a verb call, which prints the message. Try changing the comment text: the output stays the same.</p>",
    "hint": [
      "Put your own explanation in double quotes and end it with a semicolon, on a new line before <code>player:tell()</code>.",
      {
        "code": "\"Explain what the next line does.\";"
      }
    ],
    "code": "\"Comments explain the code without printing anything.\";\nplayer:tell(\"Hello from MOO!\");\nreturn;",
    "props": {},
    "diagram": "\"A note for the reader.\"; → no output\nplayer:tell(\"Hello from MOO!\"); → Hello from MOO!",
    "steps": [
      "Add another nonempty comment above <code>player:tell()</code>, then run again.",
      "Keep this greeting unchanged:",
      {
        "code": "player:tell(\"Hello from MOO!\");"
      },
      "Only Hello from MOO! should be printed. Your comments should not appear in the output."
    ],
    "expected": "0",
    "expectedOutput": [
      "Hello from MOO!"
    ],
    "experiment": [
      "Change the comment text and run again. The greeting stays unchanged."
    ]
  },
  {
    "id": "implicit-return",
    "group": "VALUES AND CONTROL FLOW",
    "title": "Return is optional",
    "verb": "#42:implicit_return",
    "exploration": true,
    "body": "<p>Reaching the end of a verb without <code>return</code> yields the integer <code>0</code>, which is false in a condition.</p><p>A bare <code>return;</code> also yields <code>0</code>, but stops the verb immediately.</p><p>To return another value, write <code>return value;</code>. The final expression is not automatically returned.</p>",
    "hint": [
      "Run the starter first, then change one thing and compare the output. Restore Example brings back the starter."
    ],
    "code": "\"No return statement: falling off the end returns 0.\";\nanswer = 42;",
    "expected": "0",
    "expectedOutput": [],
    "variants": [
      {
        "source": "answer = 42;\nreturn;",
        "expected": "0"
      },
      {
        "source": "answer = 42;\nreturn answer;\nanswer = 99;",
        "expected": "42"
      }
    ],
    "steps": [
      "Run the starter code.",
      "Compare the returned value with the value stored in answer."
    ],
    "experiment": [
      "Append a bare return:",
      {
        "code": "return;"
      },
      {
        "kind": "result",
        "code": "0"
      },
      "Then return the variable instead:",
      {
        "code": "return answer;"
      },
      {
        "kind": "result",
        "code": "42"
      },
      "Put <code>answer = 99;</code> after the <code>return</code>. The result stays <code>42</code> because <code>return</code> stops execution."
    ]
  },
  {
    "id": "objects",
    "group": "FOUNDATIONS",
    "title": "Objects are the world",
    "verb": "#42:describe",
    "body": "<p>A MOO world is made of <strong>objects</strong>. Rooms, players, exits, and tools are all objects stored in the database.</p><p>Each object has an <strong>Object Number</strong>, also called its <strong>Object #</strong>. Write it with a <code>#</code> followed by a number: <code>#42</code> uniquely refers to the Training Room.</p><p>Objects have <strong>properties</strong> that hold data, such as a name, and <strong>verbs</strong> that define behavior, such as displaying a description.</p><h2>How objects inherit</h2><p>An object can inherit properties and verbs from its <strong>parent</strong>. Think of the parent as a shared starting point for a kind of object. This relationship describes inheritance, not which room an object is inside.</p><p>Here is the hierarchy in this teaching world. Indented objects inherit from the object above them:</p><ul class=\"object-hierarchy\"><li><code>#1</code> Root Class<ul><li><code>#0</code> The System Object</li><li><code>#3</code> Generic Room<ul><li><code>#42</code> Training Room</li></ul></li><li><code>#5</code> Generic Thing</li><li><code>#6</code> Generic Player<ul><li><code>#7</code> Learner</li></ul></li></ul></li></ul><p>Training Room inherits from Generic Room. Learner inherits from Generic Player, where the <code>tell</code> verb is defined. That is why <code>player:tell(\"Hello!\");</code> works for the learner.</p><h2>The System Object and shortcuts</h2><p><code>#0</code> stores shared references. For example, <code>$room</code> is shorthand for <code>#0.room</code>, whose value is <code>#3</code> (Generic Room).</p><p>The System Object is a child of Root Class, alongside the generic classes. Its properties therefore do not automatically pass to rooms, things, or players.</p>",
    "hint": "Edit the text inside <code>player:tell(...)</code>, then run the code.",
    "code": "player:tell(\"A plain training room.\");\nreturn;",
    "props": {
      "parent": "#3",
      "name": "Training Room",
      "owner": "#7"
    },
    "diagram": "#42 training_room\n├─ parent: #3 ($room)\n├─ .name: \"Training Room\"\n└─ :describe()  ← behavior",
    "steps": [
      "Change the message so the room describes itself as:",
      {
        "code": "\"A workshop humming with possibility.\""
      }
    ],
    "expected": "0",
    "expectedOutput": [
      "A plain training room."
    ],
    "experiment": [
      "Add a second player:tell call. Output shows the two messages in order."
    ]
  },
  {
    "id": "properties",
    "group": "DATA",
    "title": "Properties hold state",
    "verb": "#42:set_lamp",
    "body": "<p>Properties attach named data to objects.</p><p>Read one with <code>this.lamp_on</code>; assign it with <code>this.lamp_on = 1;</code>. MOO uses <code>1</code> and <code>0</code> for true and false.</p>",
    "hint": [
      "Assign the property before sending the message:",
      {
        "code": "this.lamp_on = 1;\nplayer:tell(\"The lamp clicks on.\");"
      }
    ],
    "code": "this.lamp_on = 0;\nplayer:tell(\"The lamp remains dark.\");\nreturn;",
    "props": {
      "lamp_on": "0",
      "name": "Training Room",
      "owner": "#7"
    },
    "diagram": "state before  →  this.lamp_on = 0\nverb runs     →  assignment\nstate after   →  this.lamp_on = 1",
    "steps": [
      "Turn the lamp on by assigning <code>1</code> to <code>this.lamp_on</code>:",
      {
        "code": "this.lamp_on = 1;"
      },
      "Then tell the player:",
      {
        "code": "player:tell(\"The lamp clicks on.\");"
      }
    ],
    "expected": "0",
    "expectedOutput": [
      "The lamp remains dark."
    ],
    "experiment": [
      "Set <code>this.lamp_on</code> to <code>0</code>, then inspect <code>#42</code> in World. The property remains <code>0</code> after the run."
    ]
  },
  {
    "id": "args",
    "group": "VERBS",
    "title": "Arguments enter through args",
    "verb": "#42:say_color",
    "body": "<p>An explicit call such as <code>#42:say_color(\"green\")</code> passes values in <code>args</code>.</p><p>Command-dispatched verbs instead receive command words in <code>args</code>, with object phrases and resolved objects in separate built-ins.</p><p>Lists are <code>1</code>-indexed, so the first item is <code>args[1]</code>.</p>",
    "hint": "MOO joins multiple arguments passed to <code>player:tell()</code>.",
    "code": "color = \"unknown\";\nplayer:tell(\"Color: \", color);\nreturn;",
    "props": {
      "args": "{\"green\"}",
      "caller": "#7",
      "player": "#7"
    },
    "diagram": "explicit call: #42:say_color(\"green\")\n     ↓\nargs = {\"green\"}\n     ↓\nargs[1] → \"green\"",
    "steps": [
      "Use <code>args[1]</code> in the message:",
      {
        "code": "player:tell(\"Color: \", args[1]);"
      }
    ],
    "expected": "0",
    "expectedOutput": [
      "Color: unknown"
    ],
    "experiment": [
      "Print <code>args[2]</code> instead. The supplied list has one argument, so this raises <code>E_RANGE</code>."
    ]
  },
  {
    "id": "branching",
    "group": "CONTROL FLOW",
    "title": "Make decisions",
    "verb": "#42:enter",
    "body": "<p>Use <code>if</code>, <code>elseif</code>, and <code>else</code> to branch. Conditions include equality (<code>==</code>), ordering, membership (<code>in</code>), and truthiness.</p>",
    "hint": "MOO closes the block with <code>endif</code>—there are no braces.",
    "code": "player:tell(\"You enter.\");\nreturn;",
    "props": {
      "locked": "1",
      "name": "Workshop",
      "location": "#42"
    },
    "diagram": "this.locked?\n├─ yes → deny entry\n└─ no  → move player",
    "steps": [
      "Replace the unconditional welcome with a check:",
      {
        "code": "if (this.locked)\n  player:tell(\"The door is locked.\");\nelse\n  player:tell(\"You enter.\");\nendif"
      },
      "Run the code to see which branch the current room state selects."
    ],
    "expected": "0",
    "expectedOutput": [
      "You enter."
    ],
    "experiment": [
      "Set <code>this.locked = 0</code> before the condition. The else branch prints “You enter.”"
    ]
  },
  {
    "id": "lists",
    "group": "COLLECTIONS",
    "title": "Work with lists",
    "verb": "#42:list_tools",
    "body": "<p>MOO lists use braces: <code>{\"wrench\", \"probe\"}</code>. Iterate with <code>for item in (items)</code>. Lists can mix types and nest other lists.</p>",
    "hint": [
      "A for loop ends with <code>endfor</code>:",
      {
        "code": "for tool in (tools)\n  player:tell(tool);\nendfor"
      }
    ],
    "code": "tools = {\"wrench\", \"probe\", \"torch\"};\nplayer:tell(tools);\nreturn;",
    "props": {
      "tools": "{3 items}",
      "name": "Tool Rack",
      "owner": "#7"
    },
    "diagram": "tools = {\"wrench\", \"probe\", \"torch\"}\n          ↓ for tool in (tools)\n          ↓\nwrench · probe · torch",
    "steps": [
      "Loop over <code>tools</code> and tell the player each tool. Keep the variable name tool.",
      {
        "code": "for tool in (tools)\n  player:tell(tool);\nendfor"
      }
    ],
    "expected": "0",
    "expectedOutput": [
      "{list}"
    ],
    "experiment": [
      "Add <code>\"brush\"</code> to <code>tools</code> and run again. The loop prints a fourth line."
    ]
  },
  {
    "id": "truthiness",
    "group": "VALUES AND CONTROL FLOW",
    "title": "Truthy and falsey values",
    "verb": "#42:truthiness",
    "exploration": true,
    "body": "<p>An <code>if</code> runs its first branch when the value is truthy, and its <code>else</code> branch when the value is falsey. Run these examples to see each decision printed.</p><p><code>0</code>, <code>0.0</code>, <code>\"\"</code>, and <code>{}</code> take the false branch. Nonzero numbers and nonempty strings or lists take the true branch—even <code>{0}</code>, because the list contains an item.</p><p>ToastStunt also supports maps: <code>[]</code> is empty and falsey; a map with an entry is truthy.</p>",
    "hint": [
      "Look at the value inside each if (...). Zero numbers and empty collections take else; nonzero numbers and nonempty collections take the first branch.",
      "The final Return: <code>0</code> comes from reaching the end of the code. Watch the printed branch messages to see the individual decisions."
    ],
    "code": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif\n\nif ([])\n  player:tell(\"Empty map: true branch\");\nelse\n  player:tell(\"Empty map: false branch\");\nendif\n\nif ([\"key\" -> 0])\n  player:tell(\"Nonempty map: true branch\");\nelse\n  player:tell(\"Nonempty map: false branch\");\nendif",
    "expected": "0",
    "expectedOutput": [
      "First integer: false branch",
      "Second integer: true branch",
      "First string: false branch",
      "Second string: true branch",
      "First list: false branch",
      "Second list: true branch",
      "First float: false branch",
      "Second float: true branch",
      "Empty map: false branch",
      "Nonempty map: true branch"
    ],
    "variants": [
      {
        "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (1)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif\n\nif ([])\n  player:tell(\"Empty map: true branch\");\nelse\n  player:tell(\"Empty map: false branch\");\nendif\n\nif ([\"key\" -> 0])\n  player:tell(\"Nonempty map: true branch\");\nelse\n  player:tell(\"Nonempty map: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "First integer: true branch",
          "Second integer: true branch",
          "First string: false branch",
          "Second string: true branch",
          "First list: false branch",
          "Second list: true branch",
          "First float: false branch",
          "Second float: true branch",
          "Empty map: false branch",
          "Nonempty map: true branch"
        ]
      },
      {
        "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"hello\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif\n\nif ([])\n  player:tell(\"Empty map: true branch\");\nelse\n  player:tell(\"Empty map: false branch\");\nendif\n\nif ([\"key\" -> 0])\n  player:tell(\"Nonempty map: true branch\");\nelse\n  player:tell(\"Nonempty map: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "First integer: false branch",
          "Second integer: true branch",
          "First string: true branch",
          "Second string: true branch",
          "First list: false branch",
          "Second list: true branch",
          "First float: false branch",
          "Second float: true branch",
          "Empty map: false branch",
          "Nonempty map: true branch"
        ]
      },
      {
        "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({0})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif\n\nif ([])\n  player:tell(\"Empty map: true branch\");\nelse\n  player:tell(\"Empty map: false branch\");\nendif\n\nif ([\"key\" -> 0])\n  player:tell(\"Nonempty map: true branch\");\nelse\n  player:tell(\"Nonempty map: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "First integer: false branch",
          "Second integer: true branch",
          "First string: false branch",
          "Second string: true branch",
          "First list: true branch",
          "Second list: true branch",
          "First float: false branch",
          "Second float: true branch",
          "Empty map: false branch",
          "Nonempty map: true branch"
        ]
      },
      {
        "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif\n\nif ([])\n  player:tell(\"Empty map: true branch\");\nelse\n  player:tell(\"Empty map: false branch\");\nendif\n\nif ([\"key\" -> 0])\n  player:tell(\"Nonempty map: true branch\");\nelse\n  player:tell(\"Nonempty map: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "First integer: false branch",
          "Second integer: true branch",
          "First string: false branch",
          "Second string: true branch",
          "First list: false branch",
          "Second list: true branch",
          "First float: true branch",
          "Second float: true branch",
          "Empty map: false branch",
          "Nonempty map: true branch"
        ]
      },
      {
        "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif\n\nif ([\"key\" -> 0])\n  player:tell(\"Empty map: true branch\");\nelse\n  player:tell(\"Empty map: false branch\");\nendif\n\nif ([\"key\" -> 0])\n  player:tell(\"Nonempty map: true branch\");\nelse\n  player:tell(\"Nonempty map: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "First integer: false branch",
          "Second integer: true branch",
          "First string: false branch",
          "Second string: true branch",
          "First list: false branch",
          "Second list: true branch",
          "First float: false branch",
          "Second float: true branch",
          "Empty map: true branch",
          "Nonempty map: true branch"
        ]
      }
    ],
    "profileOverrides": {
      "lambdamoo": {
        "code": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "First integer: false branch",
          "Second integer: true branch",
          "First string: false branch",
          "Second string: true branch",
          "First list: false branch",
          "Second list: true branch",
          "First float: false branch",
          "Second float: true branch"
        ],
        "variants": [
          {
            "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (1)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif",
            "expected": "0",
            "expectedOutput": [
              "First integer: true branch",
              "Second integer: true branch",
              "First string: false branch",
              "Second string: true branch",
              "First list: false branch",
              "Second list: true branch",
              "First float: false branch",
              "Second float: true branch"
            ]
          },
          {
            "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"hello\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif",
            "expected": "0",
            "expectedOutput": [
              "First integer: false branch",
              "Second integer: true branch",
              "First string: true branch",
              "Second string: true branch",
              "First list: false branch",
              "Second list: true branch",
              "First float: false branch",
              "Second float: true branch"
            ]
          },
          {
            "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({0})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.0)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif",
            "expected": "0",
            "expectedOutput": [
              "First integer: false branch",
              "Second integer: true branch",
              "First string: false branch",
              "Second string: true branch",
              "First list: true branch",
              "Second list: true branch",
              "First float: false branch",
              "Second float: true branch"
            ]
          },
          {
            "source": "\"Each if tests a value directly. Watch which branch prints.\";\n\nif (0)\n  player:tell(\"First integer: true branch\");\nelse\n  player:tell(\"First integer: false branch\");\nendif\n\nif (1)\n  player:tell(\"Second integer: true branch\");\nelse\n  player:tell(\"Second integer: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"First string: true branch\");\nelse\n  player:tell(\"First string: false branch\");\nendif\n\nif (\"asdf\")\n  player:tell(\"Second string: true branch\");\nelse\n  player:tell(\"Second string: false branch\");\nendif\n\nif ({})\n  player:tell(\"First list: true branch\");\nelse\n  player:tell(\"First list: false branch\");\nendif\n\nif ({0})\n  player:tell(\"Second list: true branch\");\nelse\n  player:tell(\"Second list: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"First float: true branch\");\nelse\n  player:tell(\"First float: false branch\");\nendif\n\nif (0.5)\n  player:tell(\"Second float: true branch\");\nelse\n  player:tell(\"Second float: false branch\");\nendif",
            "expected": "0",
            "expectedOutput": [
              "First integer: false branch",
              "Second integer: true branch",
              "First string: false branch",
              "Second string: true branch",
              "First list: false branch",
              "Second list: true branch",
              "First float: true branch",
              "Second float: true branch"
            ]
          }
        ],
        "steps": [
          "Run the code and compare each printed message with its if statement. Each example prints exactly one branch."
        ],
        "experiment": [
          "Change if (<code>0</code>) to if (<code>1</code>), then run again. The first integer example now prints true branch.",
          "Change if (<code>\"\"</code>) to if (<code>\"hello\"</code>), and if (<code>{}</code>) to if (<code>{0}</code>). Both examples now take their true branches.",
          "Change if (<code>0.0</code>) to if (<code>0.5</code>). A nonzero float takes the true branch.",
          "Switch to ToastStunt to try the additional empty and nonempty map examples."
        ]
      }
    },
    "steps": [
      "Run the code and compare each printed message with its if statement. Each example prints exactly one branch."
    ],
    "experiment": [
      "Change if (<code>0</code>) to if (<code>1</code>), then run again. The first integer example now prints true branch.",
      "Change if (<code>\"\"</code>) to if (<code>\"hello\"</code>), and if (<code>{}</code>) to if (<code>{0}</code>). Both examples now take their true branches.",
      "Change if (<code>0.0</code>) to if (<code>0.5</code>). A nonzero float takes the true branch.",
      "In ToastStunt, change if ([]) to if ([<code>\"key\"</code> -<code>&gt;</code> <code>0</code>]). The map is now nonempty, even though its stored value is <code>0</code>."
    ]
  },
  {
    "id": "truthiness-equality",
    "group": "VALUES AND CONTROL FLOW",
    "title": "Falsey does not mean equal",
    "verb": "#42:truthiness_equality",
    "exploration": true,
    "body": "<p>Watch <code>if (0)</code> and <code>if (\"\")</code> both take their <code>else</code> branches. Then <code>if (0 == \"\")</code> also takes <code>else</code>: the number and string are not equal.</p><p>Being falsey describes how a value behaves in a condition; it does not make different values equal.</p>",
    "hint": [
      "Truthiness asks which branch a value selects. Equality asks whether the two values are equal. These are different questions."
    ],
    "code": "\"Both values take else, but that does not make them equal.\";\n\nif (0)\n  player:tell(\"Number: true branch\");\nelse\n  player:tell(\"Number: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"String: true branch\");\nelse\n  player:tell(\"String: false branch\");\nendif\n\nif (0 == \"\")\n  player:tell(\"Equality comparison: true branch\");\nelse\n  player:tell(\"Equality comparison: false branch\");\nendif",
    "expected": "0",
    "expectedOutput": [
      "Number: false branch",
      "String: false branch",
      "Equality comparison: false branch"
    ],
    "variants": [
      {
        "source": "\"Both values take else, but that does not make them equal.\";\n\nif (0)\n  player:tell(\"Number: true branch\");\nelse\n  player:tell(\"Number: false branch\");\nendif\n\nif (\"\")\n  player:tell(\"String: true branch\");\nelse\n  player:tell(\"String: false branch\");\nendif\n\nif (0 == 0)\n  player:tell(\"Equality comparison: true branch\");\nelse\n  player:tell(\"Equality comparison: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "Number: false branch",
          "String: false branch",
          "Equality comparison: true branch"
        ]
      },
      {
        "source": "\"Both values take else, but that does not make them equal.\";\n\nif (0)\n  player:tell(\"Number: true branch\");\nelse\n  player:tell(\"Number: false branch\");\nendif\n\nif ({})\n  player:tell(\"String: true branch\");\nelse\n  player:tell(\"String: false branch\");\nendif\n\nif (0 == {})\n  player:tell(\"Equality comparison: true branch\");\nelse\n  player:tell(\"Equality comparison: false branch\");\nendif",
        "expected": "0",
        "expectedOutput": [
          "Number: false branch",
          "String: false branch",
          "Equality comparison: false branch"
        ]
      }
    ],
    "steps": [
      "Run all three if statements and read their printed messages. Both values are falsey, but the equality comparison is false too."
    ],
    "experiment": [
      "Replace only the last condition:",
      {
        "code": "if (0 == 0)"
      },
      "Run again. The equality comparison now takes the true branch, while the first two examples still take else.",
      "Try replacing both occurrences of <code>\"\"</code> with <code>{}</code>. An empty list also takes else and is not equal to <code>0</code>."
    ]
  },
  {
    "id": "errors",
    "group": "ROBUST CODE",
    "title": "Handle errors deliberately",
    "verb": "#42:safe_lookup",
    "body": "<p>Errors such as <code>E_PROPNF</code> and <code>E_PERM</code> can be returned as values or raised by failing operations.</p><p>A <code>try</code>/<code>except</code> block lets a verb recover instead of dumping a traceback on a player.</p>",
    "hint": [
      "Put the risky lookup inside try, followed by the error handler:",
      {
        "code": "try\n  value = this.missing_property;\nexcept (E_PROPNF)\n  player:tell(\"That property does not exist.\");\nendtry"
      }
    ],
    "code": "value = this.missing_property;\nplayer:tell(value);\nreturn;",
    "props": {
      "name": "Training Room",
      "missing_property": "E_PROPNF",
      "owner": "#7"
    },
    "diagram": "try risky expression\n├─ value → continue\n└─ error → except handler",
    "steps": [
      "Catch <code>E_PROPNF</code> and tell the player that the property does not exist:",
      {
        "code": "try\n  value = this.missing_property;\nexcept (E_PROPNF)\n  player:tell(\"That property does not exist.\");\nendtry"
      }
    ],
    "expectedOutput": [],
    "starterError": "E_PROPNF",
    "experiment": [
      "Print another message after endtry. Handling <code>E_PROPNF</code> lets execution <code>continue</code> to that message."
    ]
  }
];

export function foundationLessonsForProfile(profile) {
  return lessons.map(lesson => ({...lesson, ...lesson.profileOverrides?.[profile]}));
}
