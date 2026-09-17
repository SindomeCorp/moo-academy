// Authored runnable examples and structured presentation.
export const builtinLessons = [
  {
    "id": "builtin-tostr",
    "builtin": "tostr",
    "group": "VALUES AND OUTPUT",
    "title": "tostr()",
    "verb": "#42:explore_tostr",
    "body": "<p>Join values into a string. Lists get a summary; use <code class=\"builtin-name\" title=\"MOO builtin\">toliteral</code> to inspect their contents.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Join values into a string. Lists get a summary; use toliteral to inspect\";\n\"their contents.\";\nreturn tostr(\"Score: \", 3);",
    "expected": "\"Score: 3\"",
    "expectedOutput": [],
    "edit": {
      "find": "3",
      "replace": "8",
      "expected": "\"Score: 8\""
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "3"
      },
      "With:",
      {
        "code": "8"
      },
      {
        "kind": "result",
        "code": "\"Score: 8\""
      }
    ]
  },
  {
    "id": "builtin-notify",
    "builtin": "notify",
    "group": "VALUES AND OUTPUT",
    "title": "notify()",
    "verb": "#42:explore_notify",
    "body": "<p>Send text to a player. The fixture verb player:tell wraps <code class=\"builtin-name\" title=\"MOO builtin\">notify</code> and <code class=\"builtin-name\" title=\"MOO builtin\">tostr</code>.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Send text directly to the learner. notify returns 1 when it succeeds.\";\nreturn notify(player, \"Hello, learner!\");",
    "expected": "1",
    "expectedOutput": [
      "Hello, learner!"
    ],
    "edit": {
      "find": "Hello, learner!",
      "replace": "Welcome to MOO!",
      "expected": "1",
      "output": [
        "Welcome to MOO!"
      ]
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "Hello, learner!"
      },
      "With:",
      {
        "code": "Welcome to MOO!"
      },
      {
        "kind": "result",
        "code": "1"
      },
      {
        "kind": "result",
        "label": "Expected output",
        "code": "Welcome to MOO!"
      }
    ]
  },
  {
    "id": "builtin-toliteral",
    "builtin": "toliteral",
    "group": "VALUES AND OUTPUT",
    "title": "toliteral()",
    "verb": "#42:explore_toliteral",
    "body": "<p>Turn a value into its MOO literal representation, including nested list contents.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Turn a value into its MOO literal representation, including nested list\";\n\"contents.\";\nreturn toliteral({1, 2});",
    "expected": "\"{1, 2}\"",
    "expectedOutput": [],
    "edit": {
      "find": "{1, 2}",
      "replace": "{1, 2, 3}",
      "expected": "\"{1, 2, 3}\""
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "{1, 2}"
      },
      "With:",
      {
        "code": "{1, 2, 3}"
      },
      {
        "kind": "result",
        "code": "\"{1, 2, 3}\""
      }
    ]
  },
  {
    "id": "builtin-typeof",
    "builtin": "typeof",
    "group": "VALUES AND OUTPUT",
    "title": "typeof()",
    "verb": "#42:explore_typeof",
    "body": "<p>Inspect a type code: integers are <code>0</code>, objects <code>1</code>, strings <code>2</code>, lists <code>4</code>, floats <code>9</code>, and maps <code>10</code>.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Inspect a type code: integers are 0, objects 1, strings 2, lists 4, floats\";\n\"9, and maps 10.\";\nreturn typeof(42);",
    "expected": "0",
    "expectedOutput": [],
    "edit": {
      "find": "typeof(42)",
      "replace": "typeof(\"hello\")",
      "expected": "2"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "typeof(42)"
      },
      "With:",
      {
        "code": "typeof(\"hello\")"
      },
      {
        "kind": "result",
        "code": "2"
      }
    ]
  },
  {
    "id": "builtin-length",
    "builtin": "length",
    "group": "VALUES AND OUTPUT",
    "title": "length()",
    "verb": "#42:explore_length",
    "body": "<p>Count characters in strings or items in lists and ToastStunt maps.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Count characters in strings or items in lists and ToastStunt maps.\";\nreturn length({\"red\", \"blue\"});",
    "expected": "2",
    "expectedOutput": [],
    "edit": {
      "find": "{\"red\", \"blue\"}",
      "replace": "{\"red\", \"blue\", \"green\"}",
      "expected": "3"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "{\"red\", \"blue\"}"
      },
      "With:",
      {
        "code": "{\"red\", \"blue\", \"green\"}"
      },
      {
        "kind": "result",
        "code": "3"
      }
    ]
  },
  {
    "id": "builtin-equal",
    "builtin": "equal",
    "group": "VALUES AND OUTPUT",
    "title": "equal()",
    "verb": "#42:explore_equal",
    "body": "<p>Compare values exactly. Unlike string <code>==</code>, <code class=\"builtin-name\" title=\"MOO builtin\">equal</code> distinguishes uppercase and lowercase.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Compare values exactly. Unlike string ==, equal distinguishes uppercase and\";\n\"lowercase.\";\nreturn equal(\"MOO\", \"moo\");",
    "expected": "0",
    "expectedOutput": [],
    "edit": {
      "find": "equal(\"MOO\", \"moo\")",
      "replace": "equal(\"moo\", \"moo\")",
      "expected": "1"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "equal(\"MOO\", \"moo\")"
      },
      "With:",
      {
        "code": "equal(\"moo\", \"moo\")"
      },
      {
        "kind": "result",
        "code": "1"
      }
    ]
  },
  {
    "id": "builtin-toint",
    "builtin": "toint",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VALUES AND OUTPUT",
    "title": "toint()",
    "verb": "#42:explore_toint",
    "body": "<p>Convert a scalar to an integer; malformed numeric strings become <code>0</code>.</p>",
    "code": "\"Convert a scalar to an integer; malformed numeric strings become 0.\";\nreturn toint(\"42.9\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "42",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>\"42.9\"</code> with <code>\"-3.7\"</code>. The fractional part is discarded, producing -<code>3</code>."
    ]
  },
  {
    "id": "builtin-tonum",
    "builtin": "tonum",
    "profiles": [
      "lambdamoo"
    ],
    "group": "VALUES AND OUTPUT",
    "title": "tonum()",
    "verb": "#42:explore_tonum",
    "body": "<p>LambdaMOO alias for <code class=\"builtin-name\" title=\"MOO builtin\">toint</code>.</p>",
    "code": "\"LambdaMOO alias for toint.\";\nreturn tonum(\"42\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "42",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>\"42\"</code> with <code>\"-7\"</code>. tonum is the LambdaMOO alias for integer conversion."
    ]
  },
  {
    "id": "builtin-toobj",
    "builtin": "toobj",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VALUES AND OUTPUT",
    "title": "toobj()",
    "verb": "#42:explore_toobj",
    "body": "<p>Convert a scalar to an object reference, without checking existence.</p>",
    "code": "\"Convert a scalar to an object reference, without checking existence.\";\nreturn toobj(\"#42\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "#42",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>\"#42\"</code> with <code>\"#999\"</code>, then return valid(<code>toobj(\"#999\")</code>). Conversion alone does not prove the object exists."
    ]
  },
  {
    "id": "builtin-tofloat",
    "builtin": "tofloat",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VALUES AND OUTPUT",
    "title": "tofloat()",
    "verb": "#42:explore_tofloat",
    "body": "<p>Convert a scalar to a float.</p>",
    "code": "\"Convert a scalar to a float.\";\nreturn tofloat(7);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "7.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>7</code> with <code>\"2.5\"</code>, then use the returned float in an expression with another float."
    ]
  },
  {
    "id": "builtin-min",
    "builtin": "min",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "min()",
    "verb": "#42:explore_min",
    "body": "<p>Return the smallest numeric argument.</p>",
    "code": "\"Return the smallest numeric argument.\";\nreturn min(4,-2,8);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "-2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace -<code>2</code> with <code>6</code>. Predict which remaining value is smallest."
    ]
  },
  {
    "id": "builtin-max",
    "builtin": "max",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "max()",
    "verb": "#42:explore_max",
    "body": "<p>Return the largest numeric argument.</p>",
    "code": "\"Return the largest numeric argument.\";\nreturn max(4,-2,8);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "8",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>8</code> with -<code>10</code>. Predict the new maximum."
    ]
  },
  {
    "id": "builtin-abs",
    "builtin": "abs",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "abs()",
    "verb": "#42:explore_abs",
    "body": "<p>Return numeric absolute value.</p>",
    "code": "\"Return numeric absolute value.\";\nreturn abs(-7);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "7",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace -<code>7</code> with <code>7</code>. Both have the same distance from zero."
    ]
  },
  {
    "id": "builtin-sqrt",
    "builtin": "sqrt",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "sqrt()",
    "verb": "#42:explore_sqrt",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">sqrt</code> of a float.</p>",
    "code": "\"Compute sqrt of a float.\";\nreturn sqrt(4.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>4.0</code> with <code>9.0</code>. Then try -<code>1.0</code> and read the domain error."
    ]
  },
  {
    "id": "builtin-cbrt",
    "builtin": "cbrt",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "cbrt()",
    "verb": "#42:explore_cbrt",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">cbrt</code> of a float.</p>",
    "code": "\"Compute cbrt of a float.\";\nreturn cbrt(8.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>8.0</code> with -<code>8.0</code>. A real cube root can be negative."
    ]
  },
  {
    "id": "builtin-sin",
    "builtin": "sin",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "sin()",
    "verb": "#42:explore_sin",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">sin</code> of a float.</p>",
    "code": "\"Compute sin of a float.\";\nreturn sin(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>1.5707963267948966</code> radians. The result is approximately <code>1.0</code>."
    ]
  },
  {
    "id": "builtin-cos",
    "builtin": "cos",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "cos()",
    "verb": "#42:explore_cos",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">cos</code> of a float.</p>",
    "code": "\"Compute cos of a float.\";\nreturn cos(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>3.141592653589793</code> radians. The result is approximately -<code>1.0</code>."
    ]
  },
  {
    "id": "builtin-tan",
    "builtin": "tan",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "tan()",
    "verb": "#42:explore_tan",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">tan</code> of a float.</p>",
    "code": "\"Compute tan of a float.\";\nreturn tan(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>0.7853981633974483</code> radians. The result is approximately <code>1.0</code>."
    ]
  },
  {
    "id": "builtin-asin",
    "builtin": "asin",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "asin()",
    "verb": "#42:explore_asin",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">asin</code> of a float.</p>",
    "code": "\"Compute asin of a float.\";\nreturn asin(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>1.0</code>. The angle is in radians. Values outside [-<code>1</code>,<code>1</code>] are invalid."
    ]
  },
  {
    "id": "builtin-acos",
    "builtin": "acos",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "acos()",
    "verb": "#42:explore_acos",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">acos</code> of a float.</p>",
    "code": "\"Compute acos of a float.\";\nreturn acos(1.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>1.0</code> with <code>0.0</code>. Compare with <code>asin(1.0)</code>."
    ]
  },
  {
    "id": "builtin-atan",
    "builtin": "atan",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "atan()",
    "verb": "#42:explore_atan",
    "body": "<p>Compute arctangent, or two-argument arctangent.</p>",
    "code": "\"Compute arctangent, or two-argument arctangent.\";\nreturn atan(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>1.0</code> and compare with the angle used for tan."
    ]
  },
  {
    "id": "builtin-atan2",
    "builtin": "atan2",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "atan2()",
    "verb": "#42:explore_atan2",
    "body": "<p>Compute two-argument arctangent.</p>",
    "code": "\"Compute two-argument arctangent.\";\nreturn atan2(0.0,1.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Swap <code>0.0</code> and <code>1.0</code> to change the direction. The two coordinates distinguish quadrants."
    ]
  },
  {
    "id": "builtin-sinh",
    "builtin": "sinh",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "sinh()",
    "verb": "#42:explore_sinh",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">sinh</code> of a float.</p>",
    "code": "\"Compute sinh of a float.\";\nreturn sinh(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>1.0</code>, then compare with <code>sinh(-1.0)</code>."
    ]
  },
  {
    "id": "builtin-cosh",
    "builtin": "cosh",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "cosh()",
    "verb": "#42:explore_cosh",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">cosh</code> of a float.</p>",
    "code": "\"Compute cosh of a float.\";\nreturn cosh(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>1.0</code>, then compare with <code>cosh(-1.0)</code>."
    ]
  },
  {
    "id": "builtin-tanh",
    "builtin": "tanh",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "tanh()",
    "verb": "#42:explore_tanh",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">tanh</code> of a float.</p>",
    "code": "\"Compute tanh of a float.\";\nreturn tanh(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>2.0</code>. Hyperbolic tangent approaches, but does not exceed, <code>1</code> for positive inputs."
    ]
  },
  {
    "id": "builtin-acosh",
    "builtin": "acosh",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "acosh()",
    "verb": "#42:explore_acosh",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">acosh</code> of a float.</p>",
    "code": "\"Compute acosh of a float.\";\nreturn acosh(1.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>1.0</code> with <code>2.0</code>. Try <code>0.0</code> to inspect the domain error."
    ]
  },
  {
    "id": "builtin-atanh",
    "builtin": "atanh",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "atanh()",
    "verb": "#42:explore_atanh",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">atanh</code> of a float.</p>",
    "code": "\"Compute atanh of a float.\";\nreturn atanh(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>0.5</code>. Inputs must be strictly between -<code>1</code> and <code>1</code>."
    ]
  },
  {
    "id": "builtin-asinh",
    "builtin": "asinh",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "asinh()",
    "verb": "#42:explore_asinh",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">asinh</code> of a float.</p>",
    "code": "\"Compute asinh of a float.\";\nreturn asinh(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with -<code>1.0</code> and compare the sign."
    ]
  },
  {
    "id": "builtin-exp",
    "builtin": "exp",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "exp()",
    "verb": "#42:explore_exp",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">exp</code> of a float.</p>",
    "code": "\"Compute exp of a float.\";\nreturn exp(0.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>0.0</code> with <code>1.0</code>; then calculate log(<code>exp(1.0)</code>)."
    ]
  },
  {
    "id": "builtin-log",
    "builtin": "log",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "log()",
    "verb": "#42:explore_log",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">log</code> of a float.</p>",
    "code": "\"Compute log of a float.\";\nreturn log(1.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>1.0</code> with <code>exp(1.0)</code>. Natural logarithms undo exponentiation with base e."
    ]
  },
  {
    "id": "builtin-log10",
    "builtin": "log10",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "log10()",
    "verb": "#42:explore_log10",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">log10</code> of a float.</p>",
    "code": "\"Compute log10 of a float.\";\nreturn log10(1.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>1.0</code> with <code>100.0</code>. The result is <code>2.0</code>."
    ]
  },
  {
    "id": "builtin-ceil",
    "builtin": "ceil",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "ceil()",
    "verb": "#42:explore_ceil",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">ceil</code> of a float.</p>",
    "code": "\"Compute ceil of a float.\";\nreturn ceil(1.2);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>1.2</code> with -<code>1.2</code>. Ceiling rounds toward positive infinity."
    ]
  },
  {
    "id": "builtin-floor",
    "builtin": "floor",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "floor()",
    "verb": "#42:explore_floor",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">floor</code> of a float.</p>",
    "code": "\"Compute floor of a float.\";\nreturn floor(1.8);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>1.8</code> with -<code>1.8</code>. Floor rounds toward negative infinity."
    ]
  },
  {
    "id": "builtin-trunc",
    "builtin": "trunc",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "trunc()",
    "verb": "#42:explore_trunc",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">trunc</code> of a float.</p>",
    "code": "\"Compute trunc of a float.\";\nreturn trunc(-1.8);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "-1.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace -<code>1.8</code> with <code>1.8</code>. Truncation discards the fractional part toward zero."
    ]
  },
  {
    "id": "builtin-round",
    "builtin": "round",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "round()",
    "verb": "#42:explore_round",
    "body": "<p>Compute <code class=\"builtin-name\" title=\"MOO builtin\">round</code> of a float.</p>",
    "code": "\"Compute round of a float.\";\nreturn round(-1.5);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "-2.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace -<code>1.5</code> with <code>1.5</code>. Compare the two half-way cases."
    ]
  },
  {
    "id": "builtin-floatstr",
    "builtin": "floatstr",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "NUMBERS AND MATH",
    "title": "floatstr()",
    "verb": "#42:explore_floatstr",
    "body": "<p>Format a float with decimal precision.</p>",
    "code": "\"Format a float with decimal precision.\";\nreturn floatstr(1.5,2);",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · FORMAT SUBSET: The supported options and type mappings are listed in Reference. JSON booleans become integers and null becomes E_NONE; ANSI operations use tagged strings rather than a terminal emulator.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"1.50\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the precision argument from <code>2</code> to <code>4</code>. The returned value is text, not a float."
    ]
  },
  {
    "id": "builtin-distance",
    "builtin": "distance",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "distance()",
    "verb": "#42:explore_distance",
    "body": "<p>Compute Euclidean distance between coordinates.</p>",
    "code": "\"Compute Euclidean distance between coordinates.\";\nreturn distance({0,0},{3,4});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "5.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>{3,4}</code> with <code>{6,8}</code>. The distance doubles."
    ]
  },
  {
    "id": "builtin-relative_heading",
    "builtin": "relative_heading",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "relative_heading()",
    "verb": "#42:explore_relative_heading",
    "body": "<p>Return horizontal and vertical bearings in integer degrees.</p>",
    "code": "\"Return horizontal and vertical bearings in integer degrees.\";\nreturn relative_heading({0.0,0.0,0.0},{1.0,0.0,0.0});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{0, 0}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the second point to <code>{0.0,1.0,0.0}</code> and compare the returned direction angles."
    ]
  },
  {
    "id": "builtin-simplex_noise",
    "builtin": "simplex_noise",
    "profiles": [
      "toaststunt"
    ],
    "group": "NUMBERS AND MATH",
    "title": "simplex_noise()",
    "verb": "#42:explore_simplex_noise",
    "body": "<p>Compute fixed-permutation simplex noise for one to four float coordinates.</p>",
    "code": "\"Compute fixed-permutation simplex noise for one to four float coordinates.\";\nreturn simplex_noise({0.0});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0.0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>{0.0}</code> with <code>{0.5}</code>, then try <code>{0.5, 0.25}</code>. This changes the sample position and the number of dimensions."
    ]
  },
  {
    "id": "builtin-listappend",
    "builtin": "listappend",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "listappend()",
    "verb": "#42:explore_listappend",
    "body": "<p>Return a new list after listappend.</p>",
    "code": "\"Return a new list after listappend.\";\nreturn listappend({1,2},3);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1, 2, 3}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the item <code>3</code> to <code>\"three\"</code>. Lists may contain mixed value types."
    ]
  },
  {
    "id": "builtin-listinsert",
    "builtin": "listinsert",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "listinsert()",
    "verb": "#42:explore_listinsert",
    "body": "<p>Return a new list after listinsert.</p>",
    "code": "\"Return a new list after listinsert.\";\nreturn listinsert({1,2},3);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{3, 1, 2}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Add an explicit final argument <code>2</code> to insert before the second item."
    ]
  },
  {
    "id": "builtin-listdelete",
    "builtin": "listdelete",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "listdelete()",
    "verb": "#42:explore_listdelete",
    "body": "<p>Return a new list after listdelete.</p>",
    "code": "\"Return a new list after listdelete.\";\nreturn listdelete({1,2},1);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{2}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change index <code>1</code> to <code>2</code>. Indices start at one."
    ]
  },
  {
    "id": "builtin-listset",
    "builtin": "listset",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "listset()",
    "verb": "#42:explore_listset",
    "body": "<p>Return a new list after listset.</p>",
    "code": "\"Return a new list after listset.\";\nreturn listset({1,2},3,2);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1, 3}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the replacement value <code>3</code> to <code>9</code>; the index <code>2</code> still chooses the same slot."
    ]
  },
  {
    "id": "builtin-setadd",
    "builtin": "setadd",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "setadd()",
    "verb": "#42:explore_setadd",
    "body": "<p>Return a new list after setadd.</p>",
    "code": "\"Return a new list after setadd.\";\nreturn setadd({1,2},3);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1, 2, 3}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the added value <code>3</code> to <code>2</code>. The duplicate is not added."
    ]
  },
  {
    "id": "builtin-setremove",
    "builtin": "setremove",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "setremove()",
    "verb": "#42:explore_setremove",
    "body": "<p>Return a new list after setremove.</p>",
    "code": "\"Return a new list after setremove.\";\nreturn setremove({1,2},1);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{2}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the removed value <code>1</code> to <code>9</code>. A missing member leaves the list unchanged."
    ]
  },
  {
    "id": "builtin-is_member",
    "builtin": "is_member",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "is_member()",
    "verb": "#42:explore_is_member",
    "body": "<p>Find the first matching value, using case-sensitive comparison by default.</p>",
    "code": "\"Find the first matching value, using case-sensitive comparison by default.\";\nreturn is_member(\"A\",{\"a\",\"A\"});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"A\"</code> to <code>\"a\"</code>. Compare the exact matches in the list."
    ]
  },
  {
    "id": "builtin-all_members",
    "builtin": "all_members",
    "profiles": [
      "toaststunt"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "all_members()",
    "verb": "#42:explore_all_members",
    "body": "<p>Return all one-based matching indices, ignoring ASCII case.</p>",
    "code": "\"Return all one-based matching indices, ignoring ASCII case.\";\nreturn all_members(\"A\",{\"a\",\"b\",\"A\"});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1, 3}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"A\"</code> to <code>\"b\"</code>. The list contains the matching positions, not the values."
    ]
  },
  {
    "id": "builtin-slice",
    "builtin": "slice",
    "profiles": [
      "toaststunt"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "slice()",
    "verb": "#42:explore_slice",
    "body": "<p>Extract selected columns or map values from a list.</p>",
    "code": "\"Extract selected columns or map values from a list.\";\nreturn slice({{1,2},{3,4}},2);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{2, 4}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the column argument from <code>2</code> to <code>1</code> to select the first element from each row."
    ]
  },
  {
    "id": "builtin-sort",
    "builtin": "sort",
    "profiles": [
      "toaststunt"
    ],
    "group": "LISTS, SETS AND MAPS",
    "title": "sort()",
    "verb": "#42:explore_sort",
    "body": "<p>Sort a homogeneous scalar list, optionally by separate keys.</p>",
    "code": "\"Sort a homogeneous scalar list, optionally by separate keys.\";\nreturn sort({3,1,2});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1, 2, 3}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>{3,1,2}</code> with <code>{9,-1,4,4}</code>. Duplicate values remain in the sorted result."
    ]
  },
  {
    "id": "builtin-mapkeys",
    "builtin": "mapkeys",
    "group": "LISTS, SETS AND MAPS",
    "title": "mapkeys()",
    "verb": "#42:explore_mapkeys",
    "body": "<p>List the keys of a map in sorted order. Maps associate keys with values.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"List the keys of a map in sorted order. Maps associate keys with values.\";\nreturn mapkeys([\"red\" -> 3, \"blue\" -> 2]);",
    "expected": "{\"blue\", \"red\"}",
    "expectedOutput": [],
    "edit": {
      "find": "\"red\" -> 3",
      "replace": "\"green\" -> 3",
      "expected": "{\"blue\", \"green\"}"
    },
    "profiles": [
      "toaststunt"
    ],
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"red\" -> 3"
      },
      "With:",
      {
        "code": "\"green\" -> 3"
      },
      {
        "kind": "result",
        "code": "{\"blue\", \"green\"}"
      }
    ]
  },
  {
    "id": "builtin-mapvalues",
    "builtin": "mapvalues",
    "group": "LISTS, SETS AND MAPS",
    "title": "mapvalues()",
    "verb": "#42:explore_mapvalues",
    "body": "<p>List values in sorted key order, or request particular keys as extra arguments.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"List values in sorted key order, or request particular keys as extra\";\n\"arguments.\";\ncolors = [\"red\" -> 3, \"blue\" -> 2];\nreturn mapvalues(colors);",
    "expected": "{2, 3}",
    "expectedOutput": [],
    "edit": {
      "find": "mapvalues(colors)",
      "replace": "mapvalues(colors, \"red\")",
      "expected": "{3}"
    },
    "profiles": [
      "toaststunt"
    ],
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "mapvalues(colors)"
      },
      "With:",
      {
        "code": "mapvalues(colors, \"red\")"
      },
      {
        "kind": "result",
        "code": "{3}"
      }
    ]
  },
  {
    "id": "builtin-maphaskey",
    "builtin": "maphaskey",
    "group": "LISTS, SETS AND MAPS",
    "title": "maphaskey()",
    "verb": "#42:explore_maphaskey",
    "body": "<p>Check whether a map contains a key. The optional case flag controls string key matching.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Check whether a map contains a key. The optional case flag controls string\";\n\"key matching.\";\nreturn maphaskey([\"red\" -> 3], \"red\");",
    "expected": "1",
    "expectedOutput": [],
    "edit": {
      "find": "], \"red\")",
      "replace": "], \"blue\")",
      "expected": "0"
    },
    "profiles": [
      "toaststunt"
    ],
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "], \"red\")"
      },
      "With:",
      {
        "code": "], \"blue\")"
      },
      {
        "kind": "result",
        "code": "0"
      }
    ]
  },
  {
    "id": "builtin-mapdelete",
    "builtin": "mapdelete",
    "group": "LISTS, SETS AND MAPS",
    "title": "mapdelete()",
    "verb": "#42:explore_mapdelete",
    "body": "<p>Return a map with a key removed. The original map is unchanged; missing keys raise <code>E_RANGE</code>.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Return a map with a key removed. The original map is unchanged; missing keys\";\n\"raise E_RANGE.\";\ncolors = [\"red\" -> 3, \"blue\" -> 2];\nreturn mapdelete(colors, \"red\");",
    "expected": "[\"blue\" -> 2]",
    "expectedOutput": [],
    "edit": {
      "find": "mapdelete(colors, \"red\")",
      "replace": "mapdelete(colors, \"blue\")",
      "expected": "[\"red\" -> 3]"
    },
    "profiles": [
      "toaststunt"
    ],
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "mapdelete(colors, \"red\")"
      },
      "With:",
      {
        "code": "mapdelete(colors, \"blue\")"
      },
      {
        "kind": "result",
        "code": "[\"red\" -> 3]"
      }
    ]
  },
  {
    "id": "builtin-index",
    "builtin": "index",
    "group": "STRINGS AND PATTERNS",
    "title": "index()",
    "verb": "#42:explore_index",
    "body": "<p>Find the first match. Positions start at <code>1</code>; <code>0</code> means no match. Matching ignores ASCII case by default.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Find the first match. Positions start at 1; 0 means no match. Matching\";\n\"ignores ASCII case by default.\";\nreturn index(\"banana\", \"an\");",
    "expected": "2",
    "expectedOutput": [],
    "edit": {
      "find": "\"an\"",
      "replace": "\"na\"",
      "expected": "3"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"an\""
      },
      "With:",
      {
        "code": "\"na\""
      },
      {
        "kind": "result",
        "code": "3"
      }
    ]
  },
  {
    "id": "builtin-rindex",
    "builtin": "rindex",
    "group": "STRINGS AND PATTERNS",
    "title": "rindex()",
    "verb": "#42:explore_rindex",
    "body": "<p>Find the last match. An optional third argument of <code>1</code> makes matching case sensitive.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Find the last match. An optional third argument of 1 makes matching case\";\n\"sensitive.\";\nreturn rindex(\"banana\", \"an\");",
    "expected": "4",
    "expectedOutput": [],
    "edit": {
      "find": "\"an\"",
      "replace": "\"na\"",
      "expected": "5"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"an\""
      },
      "With:",
      {
        "code": "\"na\""
      },
      {
        "kind": "result",
        "code": "5"
      }
    ]
  },
  {
    "id": "builtin-strcmp",
    "builtin": "strcmp",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "strcmp()",
    "verb": "#42:explore_strcmp",
    "body": "<p>Compare strings case-sensitively: -<code>1</code>, <code>0</code> or <code>1</code>.</p>",
    "code": "\"Compare strings case-sensitively: -1, 0 or 1.\";\nreturn strcmp(\"A\",\"a\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "-1",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Swap the arguments and compare the sign. Zero means the strings match exactly."
    ]
  },
  {
    "id": "builtin-strsub",
    "builtin": "strsub",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "strsub()",
    "verb": "#42:explore_strsub",
    "body": "<p>Replace nonoverlapping substring occurrences.</p>",
    "code": "\"Replace nonoverlapping substring occurrences.\";\nreturn strsub(\"ABab\",\"ab\",\"x\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"xx\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Add a fourth argument of <code>1</code> to request case-sensitive matching."
    ]
  },
  {
    "id": "builtin-explode",
    "builtin": "explode",
    "profiles": [
      "toaststunt"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "explode()",
    "verb": "#42:explore_explode",
    "body": "<p>Split on the first delimiter character (space by default).</p>",
    "code": "\"Split on the first delimiter character (space by default).\";\nreturn explode(\"a  b\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{\"a\", \"b\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>\"a  b\"</code> with <code>\"a,b,c\"</code> and supply <code>\",\"</code> as the separator."
    ]
  },
  {
    "id": "builtin-reverse",
    "builtin": "reverse",
    "profiles": [
      "toaststunt"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "reverse()",
    "verb": "#42:explore_reverse",
    "body": "<p>Reverse a list or string.</p>",
    "code": "\"Reverse a list or string.\";\nreturn reverse(\"abc\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"cba\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>\"abc\"</code> with <code>{1,2,3}</code>. Reversal works on a list too."
    ]
  },
  {
    "id": "builtin-strtr",
    "builtin": "strtr",
    "profiles": [
      "toaststunt"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "strtr()",
    "verb": "#42:explore_strtr",
    "body": "<p>Translate characters, deleting those without a replacement.</p>",
    "code": "\"Translate characters, deleting those without a replacement.\";\nreturn strtr(\"AbCd\",\"ac\",\"xy\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"XbYd\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change one destination character while keeping the source and destination alphabets the same length."
    ]
  },
  {
    "id": "builtin-match",
    "builtin": "match",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "match()",
    "verb": "#42:explore_match",
    "body": "<p>Find the first MOO pattern match.</p>",
    "code": "\"Find the first MOO pattern match.\";\nreturn match(\"Abc\",\"b\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REGEX SUBSET: Uses a bounded RE2-compatible engine. Backreferences in patterns, lookarounds and unsupported syntax are rejected. Native MOO/PCRE patterns may need changes.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{2, 2, {{0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}}, \"Abc\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the subject text and inspect the <code>1</code>-based match and capture ranges. A nonmatch returns an empty list."
    ]
  },
  {
    "id": "builtin-rmatch",
    "builtin": "rmatch",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "rmatch()",
    "verb": "#42:explore_rmatch",
    "body": "<p>Find the rightmost MOO pattern match.</p>",
    "code": "\"Find the rightmost MOO pattern match.\";\nreturn rmatch(\"ababa\",\"aba\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REGEX SUBSET: Uses a bounded RE2-compatible engine. Backreferences in patterns, lookarounds and unsupported syntax are rejected. Native MOO/PCRE patterns may need changes.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{3, 5, {{0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}, {0, -1}}, \"ababa\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use a subject containing the pattern twice and compare with match on the same text."
    ]
  },
  {
    "id": "builtin-substitute",
    "builtin": "substitute",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "substitute()",
    "verb": "#42:explore_substitute",
    "body": "<p>Expand %<code>0</code>–%<code>9</code> captures and %% using a <code class=\"builtin-name\" title=\"MOO builtin\">match</code>() result.</p>",
    "code": "\"Expand %0 %9 captures and %% using a match() result.\";\nreturn substitute(\"%2, %1!\",match(\"Hello World\",\"%(Hello%) %(World%)\"));",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REGEX SUBSET: Uses a bounded RE2-compatible engine. Backreferences in patterns, lookarounds and unsupported syntax are rejected. Native MOO/PCRE patterns may need changes.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"World, Hello!\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the replacement template while keeping the match record. Capture references refer to the pattern’s groups."
    ]
  },
  {
    "id": "builtin-pcre_match",
    "builtin": "pcre_match",
    "profiles": [
      "toaststunt"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "pcre_match()",
    "verb": "#42:explore_pcre_match",
    "body": "<p>Return capture maps for matching substrings.</p>",
    "code": "\"Return capture maps for matching substrings.\";\nreturn pcre_match(\"a1b2\",\"[0-9]\",0,0);",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REGEX SUBSET: Uses a bounded RE2-compatible engine. Backreferences in patterns, lookarounds and unsupported syntax are rejected. Native MOO/PCRE patterns may need changes.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{[\"0\" -> [\"match\" -> \"1\", \"position\" -> {2, 2}]]}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the subject so it does not match, then inspect the returned empty result."
    ]
  },
  {
    "id": "builtin-pcre_replace",
    "builtin": "pcre_replace",
    "profiles": [
      "toaststunt"
    ],
    "group": "STRINGS AND PATTERNS",
    "title": "pcre_replace()",
    "verb": "#42:explore_pcre_replace",
    "body": "<p>Replace text using an s/pattern/replacement/flags command.</p>",
    "code": "\"Replace text using an s/pattern/replacement/flags command.\";\nreturn pcre_replace(\"A1 B2\",\"s/([A-Z])([0-9])/$2$1/g\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REGEX SUBSET: Uses a bounded RE2-compatible engine. Backreferences in patterns, lookarounds and unsupported syntax are rejected. Native MOO/PCRE patterns may need changes.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"1A 2B\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use a subject with two matches and compare replacement with and without the global flag."
    ]
  },
  {
    "id": "builtin-encode_binary",
    "builtin": "encode_binary",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "encode_binary()",
    "verb": "#42:explore_encode_binary",
    "body": "<p>Encode bytes, strings and nested lists as a MOO binary string.</p>",
    "code": "\"Encode bytes, strings and nested lists as a MOO binary string.\";\nreturn encode_binary(\"a\",{0,126,255});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"a~00~7E~FF\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace a byte value with <code>10</code> and inspect the ~0A escape. Bytes must be integers from <code>0</code> through <code>255</code>."
    ]
  },
  {
    "id": "builtin-decode_binary",
    "builtin": "decode_binary",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "decode_binary()",
    "verb": "#42:explore_decode_binary",
    "body": "<p>Decode a MOO binary string into byte integers or mixed text and bytes.</p>",
    "code": "\"Decode a MOO binary string into byte integers or mixed text and bytes.\";\nreturn decode_binary(\"ab~00c\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{\"ab\", 0, \"c\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change a ~XX escape to ~<code>00</code>. Compare grouped and fully numeric output using the optional argument."
    ]
  },
  {
    "id": "builtin-chr",
    "builtin": "chr",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "chr()",
    "verb": "#42:explore_chr",
    "body": "<p>Build a string from bytes, strings and nested lists.</p>",
    "code": "\"Build a string from bytes, strings and nested lists.\";\nreturn chr(65,{66,\"C\"});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"ABC\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Try <code>chr(65)</code>, then <code>chr(10)</code>. Compare printable characters and binary escaping."
    ]
  },
  {
    "id": "builtin-encode_base64",
    "builtin": "encode_base64",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "encode_base64()",
    "verb": "#42:explore_encode_base64",
    "body": "<p>Encode a MOO binary string as Base64.</p>",
    "code": "\"Encode a MOO binary string as Base64.\";\nreturn encode_base64(\"foo\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"Zm9v\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Encode <code>\"hello\"</code> instead, then pass the result to decode_base64."
    ]
  },
  {
    "id": "builtin-decode_base64",
    "builtin": "decode_base64",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "decode_base64()",
    "verb": "#42:explore_decode_base64",
    "body": "<p>Decode Base64 to a MOO binary string.</p>",
    "code": "\"Decode Base64 to a MOO binary string.\";\nreturn decode_base64(\"AA==\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"~00\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use decode_base64(<code>encode_base64(\"hello\")</code>) to check a round trip."
    ]
  },
  {
    "id": "builtin-url_encode",
    "builtin": "url_encode",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "url_encode()",
    "verb": "#42:explore_url_encode",
    "body": "<p>Percent-encode UTF-<code>8</code> text for a URL component.</p>",
    "code": "\"Percent-encode UTF-8 text for a URL component.\";\nreturn url_encode(\"a b/c\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"a%20b%2Fc\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Encode <code>\"a b&amp;c\"</code>. Spaces and the ampersand must be represented safely."
    ]
  },
  {
    "id": "builtin-url_decode",
    "builtin": "url_decode",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "url_decode()",
    "verb": "#42:explore_url_decode",
    "body": "<p>Decode percent-encoded UTF-<code>8</code> text; plus signs remain literal.</p>",
    "code": "\"Decode percent-encoded UTF-8 text; plus signs remain literal.\";\nreturn url_decode(\"a%20b%2Fc\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"a b/c\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Decode <code>\"a%20b%26c\"</code> and inspect the restored characters."
    ]
  },
  {
    "id": "builtin-parse_json",
    "builtin": "parse_json",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "parse_json()",
    "verb": "#42:explore_parse_json",
    "body": "<p>Parse JSON into MOO values, preserving <code>64</code>-bit integers.</p>",
    "code": "\"Parse JSON into MOO values, preserving 64-bit integers.\";\nreturn parse_json(\"[9223372036854775807, null, true]\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · FORMAT SUBSET: The supported options and type mappings are listed in Reference. JSON booleans become integers and null becomes E_NONE; ANSI operations use tagged strings rather than a terminal emulator.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{9223372036854775807, E_NONE, 1}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change a numeric field in the JSON text, then inspect the decoded map."
    ]
  },
  {
    "id": "builtin-generate_json",
    "builtin": "generate_json",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "generate_json()",
    "verb": "#42:explore_generate_json",
    "body": "<p>Generate JSON using common-subset or embedded-types encoding.</p>",
    "code": "\"Generate JSON using common-subset or embedded-types encoding.\";\nreturn generate_json({1,\"x\",#7},\"embedded-types\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · FORMAT SUBSET: The supported options and type mappings are listed in Reference. JSON booleans become integers and null becomes E_NONE; ANSI operations use tagged strings rather than a terminal emulator.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"[1,\\\"x\\\",\\\"#7|obj\\\"]\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change a value in the MOO list or map, then compare the emitted JSON text."
    ]
  },
  {
    "id": "builtin-parse_ansi",
    "builtin": "parse_ansi",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "parse_ansi()",
    "verb": "#42:explore_parse_ansi",
    "body": "<p>Expand color tags into ANSI control codes.</p>",
    "code": "\"Expand color tags into ANSI control codes.\";\nreturn parse_ansi(\"[red]Hi[normal]\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · FORMAT SUBSET: The supported options and type mappings are listed in Reference. JSON booleans become integers and null becomes E_NONE; ANSI operations use tagged strings rather than a terminal emulator.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"\\u001b[31mHi\\u001b[0m\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change a recognized color tag. The return is an encoded string; the feedback panel does not act as an ANSI terminal."
    ]
  },
  {
    "id": "builtin-remove_ansi",
    "builtin": "remove_ansi",
    "profiles": [
      "toaststunt"
    ],
    "group": "ENCODING AND FORMATS",
    "title": "remove_ansi()",
    "verb": "#42:explore_remove_ansi",
    "body": "<p>Remove recognized color tags from text.</p>",
    "code": "\"Remove recognized color tags from text.\";\nreturn remove_ansi(\"[red]Hi[normal]\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · FORMAT SUBSET: The supported options and type mappings are listed in Reference. JSON booleans become integers and null becomes E_NONE; ANSI operations use tagged strings rather than a terminal emulator.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"Hi\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Put two recognized tags around some text. The text remains after the tags are removed."
    ]
  },
  {
    "id": "builtin-valid",
    "builtin": "valid",
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "valid()",
    "verb": "#42:explore_valid",
    "body": "<p>Check whether an object exists. The teaching world includes player <code>#7</code> and room <code>#42</code>.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Check whether an object exists. The teaching world includes player #7 and\";\n\"room #42.\";\nreturn valid(#42);",
    "expected": "1",
    "expectedOutput": [],
    "edit": {
      "find": "valid(#42)",
      "replace": "valid(#999)",
      "expected": "0"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "valid(#42)"
      },
      "With:",
      {
        "code": "valid(#999)"
      },
      {
        "kind": "result",
        "code": "0"
      }
    ]
  },
  {
    "id": "builtin-parent",
    "builtin": "parent",
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "parent()",
    "verb": "#42:explore_parent",
    "body": "<p>Read an object's parent. Training Room <code>#42</code> inherits from Generic Room <code>#3</code>.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Read an object's parent. Training Room #42 inherits from Generic Room #3.\";\nreturn parent(#42);",
    "expected": "#3",
    "expectedOutput": [],
    "edit": {
      "find": "parent(#42)",
      "replace": "parent(#3)",
      "expected": "#1"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "parent(#42)"
      },
      "With:",
      {
        "code": "parent(#3)"
      },
      {
        "kind": "result",
        "code": "#1"
      }
    ]
  },
  {
    "id": "builtin-parents",
    "builtin": "parents",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "parents()",
    "verb": "#42:explore_parents",
    "body": "<p>Read the list of direct parents. This runtime supports one parent.</p>",
    "code": "\"Read the list of direct parents. This runtime supports one parent.\";\nreturn parents(this);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#3}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use <code>parents($room)</code> to inspect the class above Generic Room. Only one parent is supported here."
    ]
  },
  {
    "id": "builtin-children",
    "builtin": "children",
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "children()",
    "verb": "#42:explore_children",
    "body": "<p>List direct children of an object. Descendants further down the tree are not included.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"List direct children of an object. Descendants further down the tree are not\";\n\"included.\";\nreturn children(#3);",
    "expected": "{#42}",
    "expectedOutput": [],
    "edit": {
      "find": "children(#3)",
      "replace": "children(#42)",
      "expected": "{}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "children(#3)"
      },
      "With:",
      {
        "code": "children(#42)"
      },
      {
        "kind": "result",
        "code": "{}"
      }
    ]
  },
  {
    "id": "builtin-ancestors",
    "builtin": "ancestors",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "ancestors()",
    "verb": "#42:explore_ancestors",
    "body": "<p>List ancestors in the inheritance tree.</p>",
    "code": "\"List ancestors in the inheritance tree.\";\nreturn ancestors(#42);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#3, #1}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>#42</code> with <code>#7</code> and follow the Generic Player branch."
    ]
  },
  {
    "id": "builtin-descendants",
    "builtin": "descendants",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "descendants()",
    "verb": "#42:explore_descendants",
    "body": "<p>List descendants in the inheritance tree.</p>",
    "code": "\"List descendants in the inheritance tree.\";\nreturn descendants(#1);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#0, #3, #42, #5, #6, #7}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>#1</code> with <code>$room</code> to narrow the result to room descendants."
    ]
  },
  {
    "id": "builtin-isa",
    "builtin": "isa",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "isa()",
    "verb": "#42:explore_isa",
    "body": "<p>Test inheritance, including the object itself.</p>",
    "code": "\"Test inheritance, including the object itself.\";\nreturn isa(#42,#0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Compare <code>isa(#42,$room)</code> with <code>isa(#42,$player)</code>."
    ]
  },
  {
    "id": "builtin-owned_objects",
    "builtin": "owned_objects",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "owned_objects()",
    "verb": "#42:explore_owned_objects",
    "body": "<p>Find owned objects.</p>",
    "code": "\"Find owned objects.\";\nreturn owned_objects(#7);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#0, #1, #3, #5, #6, #7, #42}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Compare <code>owned_objects(#7)</code> with <code>owned_objects(#0)</code>, then inspect owners in World."
    ]
  },
  {
    "id": "builtin-locate_by_name",
    "builtin": "locate_by_name",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "locate_by_name()",
    "verb": "#42:explore_locate_by_name",
    "body": "<p>Find world objects by part of their names.</p>",
    "code": "\"Find world objects by part of their names.\";\nreturn locate_by_name(\"Room\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#3, #42}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Search for <code>\"Learner\"</code> instead of <code>\"Room\"</code> and compare the matches."
    ]
  },
  {
    "id": "builtin-create",
    "builtin": "create",
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "create()",
    "verb": "#42:explore_create",
    "body": "<p>Create a child of a parent object. New objects inherit properties and verbs. Initialization hooks are unsupported here.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Create a child of a parent object. New objects inherit properties and verbs.\";\n\"Initialization hooks are unsupported here.\";\nroom = create(#3);\n\"Give the new object a name so it is easy to find in the World browser.\";\nroom.name = \"My Workshop\";\nreturn room;",
    "expected": "#43",
    "expectedOutput": [],
    "edit": {
      "find": "room.name = \"My Workshop\";",
      "replace": "room = create(#3);\nroom.name = \"My Workshop\";",
      "expected": "#44"
    },
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "room.name = \"My Workshop\";"
      },
      "With:",
      {
        "code": "room = create(#3);\nroom.name = \"My Workshop\";"
      },
      {
        "kind": "result",
        "code": "#44"
      }
    ]
  },
  {
    "id": "builtin-max_object",
    "builtin": "max_object",
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "max_object()",
    "verb": "#42:explore_max_object",
    "body": "<p>Read the highest allocated object number. Recycling an object does not lower this number.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Read the highest allocated object number. Recycling an object does not lower\";\n\"this number.\";\n\"The fresh fixture ends at #42. Allocation creates #43.\";\nroom = create(#3);\nreturn max_object();",
    "expected": "#43",
    "expectedOutput": [],
    "edit": {
      "find": "room = create(#3);",
      "replace": "room = create(#3);\nother = create(#3);",
      "expected": "#44"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "room = create(#3);"
      },
      "With:",
      {
        "code": "room = create(#3);\nother = create(#3);"
      },
      {
        "kind": "result",
        "code": "#44"
      }
    ]
  },
  {
    "id": "builtin-chparent",
    "builtin": "chparent",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "chparent()",
    "verb": "#42:explore_chparent",
    "body": "<p>Change a single parent and rebuild inherited property slots.</p>",
    "code": "\"Change a single parent and rebuild inherited property slots.\";\nreturn chparent(#42,#0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "After reparenting, return <code>parent(#42)</code> and inspect inherited property slots. Use a fresh checkpoint to undo the class change."
    ]
  },
  {
    "id": "builtin-move",
    "builtin": "move",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "move()",
    "verb": "#42:explore_move",
    "body": "<p>Move an object, calling accept, exitfunc and enterfunc hooks.</p>",
    "code": "\"Move an object, calling accept, exitfunc and enterfunc hooks.\";\nreturn move(#42,#-1);",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Move a newly created object to <code>#-1</code>, then return its location. A nonempty destination needs an accepting room or appropriate native permissions."
    ]
  },
  {
    "id": "builtin-locations",
    "builtin": "locations",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "locations()",
    "verb": "#42:explore_locations",
    "body": "<p>Inspect nested containment.</p>",
    "code": "\"Inspect nested containment.\";\nreturn locations(#42);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Move a new object into an accepting room, then inspect <code>locations(new_object)</code>. Containment differs from inheritance."
    ]
  },
  {
    "id": "builtin-occupants",
    "builtin": "occupants",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "occupants()",
    "verb": "#42:explore_occupants",
    "body": "<p>Select objects by their ancestry from a supplied list.</p>",
    "code": "\"Select objects by their ancestry from a supplied list.\";\nreturn occupants({#7,#42},#1);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#7, #42}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the ancestry filter from <code>#1</code> to <code>$room</code> and compare the selected objects."
    ]
  },
  {
    "id": "builtin-players",
    "builtin": "players",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "players()",
    "verb": "#42:explore_players",
    "body": "<p>List player objects.</p>",
    "code": "\"List player objects.\";\nreturn players();",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call <code>set_player_flag(#7,1)</code> before returning <code>players()</code>. The flag, not the class name, controls membership."
    ]
  },
  {
    "id": "builtin-is_player",
    "builtin": "is_player",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "is_player()",
    "verb": "#42:explore_is_player",
    "body": "<p>Inspect an object’s player flag.</p>",
    "code": "\"Inspect an object s player flag.\";\nreturn is_player(#7);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call <code>set_player_flag(#7,1)</code>, then return <code>is_player(#7)</code>."
    ]
  },
  {
    "id": "builtin-set_player_flag",
    "builtin": "set_player_flag",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "set_player_flag()",
    "verb": "#42:explore_set_player_flag",
    "body": "<p>Set an object’s player flag.</p>",
    "code": "\"Set an object s player flag.\";\nreturn set_player_flag(#7,1);",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "After setting the flag, return <code>is_player(#7)</code>. Change the flag to <code>0</code> and compare."
    ]
  },
  {
    "id": "builtin-recycle",
    "builtin": "recycle",
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "recycle()",
    "verb": "#42:explore_recycle",
    "body": "<p>Remove a scratch object and check that it is gone. Recycle hooks are unsupported here.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Remove a scratch object and check that it is gone. Recycle hooks are\";\n\"unsupported here.\";\nroom = create(#3);\nrecycle(room);\nreturn valid(room);",
    "expected": "0",
    "expectedOutput": [],
    "edit": {
      "find": "recycle(room);",
      "replace": "\"Keep the room this time.\";",
      "expected": "1"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "recycle(room);"
      },
      "With:",
      {
        "code": "\"Keep the room this time.\";"
      },
      {
        "kind": "result",
        "code": "1"
      }
    ]
  },
  {
    "id": "builtin-recreate",
    "builtin": "recreate",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "recreate()",
    "verb": "#42:explore_recreate",
    "body": "<p>Recreate a recycled or skipped object number.</p>",
    "code": "\"Recreate a recycled or skipped object number.\";\nreturn recreate(#2,#1);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "#2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use another unused ID below <code>max_object()</code>, such as <code>#4</code>. Recreating a live object or a never-allocated ID fails."
    ]
  },
  {
    "id": "builtin-renumber",
    "builtin": "renumber",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "renumber()",
    "verb": "#42:explore_renumber",
    "body": "<p>Move an object to the first available lower ID.</p>",
    "code": "\"Move an object to the first available lower ID.\";\nreturn renumber(#42);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "#2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Run on a newly created object instead of <code>#42</code>, then inspect parents and children in World. Arbitrary property references to its old ID are not rewritten."
    ]
  },
  {
    "id": "builtin-reset_max_object",
    "builtin": "reset_max_object",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "reset_max_object()",
    "verb": "#42:explore_reset_max_object",
    "body": "<p>Lower the allocation high-water mark to the highest surviving object.</p>",
    "code": "\"Lower the allocation high-water mark to the highest surviving object.\";\nreturn reset_max_object();",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Create and recycle a temporary highest-numbered object before calling this. Return <code>max_object()</code> afterward and compare the next created ID."
    ]
  },
  {
    "id": "builtin-recycled_objects",
    "builtin": "recycled_objects",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "recycled_objects()",
    "verb": "#42:explore_recycled_objects",
    "body": "<p>List unused object numbers.</p>",
    "code": "\"List unused object numbers.\";\nreturn length(recycled_objects());",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "36",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>recycled_objects()</code> without <code>length()</code> to inspect the free IDs. Do not confuse recycled IDs with live objects."
    ]
  },
  {
    "id": "builtin-next_recycled_object",
    "builtin": "next_recycled_object",
    "profiles": [
      "toaststunt"
    ],
    "group": "OBJECTS AND PERSISTENT STATE",
    "title": "next_recycled_object()",
    "verb": "#42:explore_next_recycled_object",
    "body": "<p>Find an unused object number.</p>",
    "code": "\"Find an unused object number.\";\nreturn next_recycled_object();",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "#2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Create and recycle a new object, then compare the first available recycled ID."
    ]
  },
  {
    "id": "builtin-properties",
    "builtin": "properties",
    "group": "PROPERTIES AND VERBS",
    "title": "properties()",
    "verb": "#42:explore_properties",
    "body": "<p>List properties defined on this object, excluding inherited definitions.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"List properties defined on this object, excluding inherited definitions.\";\nreturn properties(#42);",
    "expected": "{\"lamp_on\", \"locked\"}",
    "expectedOutput": [],
    "edit": {
      "find": "properties(#42)",
      "replace": "properties(#3)",
      "expected": "{}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "properties(#42)"
      },
      "With:",
      {
        "code": "properties(#3)"
      },
      {
        "kind": "result",
        "code": "{}"
      }
    ]
  },
  {
    "id": "builtin-property_info",
    "builtin": "property_info",
    "group": "PROPERTIES AND VERBS",
    "title": "property_info()",
    "verb": "#42:explore_property_info",
    "body": "<p>Read a property's owner and permission string. Permissions are metadata in this educational runtime.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Read a property's owner and permission string. Permissions are metadata in\";\n\"this educational runtime.\";\nreturn property_info(#42, \"lamp_on\");",
    "expected": "{#7, \"rw\"}",
    "expectedOutput": [],
    "edit": {
      "find": "property_info(#42, \"lamp_on\")",
      "replace": "property_info(#42, \"lamp_on\")[2]",
      "expected": "\"rw\""
    },
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "property_info(#42, \"lamp_on\")"
      },
      "With:",
      {
        "code": "property_info(#42, \"lamp_on\")[2]"
      },
      {
        "kind": "result",
        "code": "\"rw\""
      }
    ]
  },
  {
    "id": "builtin-add_property",
    "builtin": "add_property",
    "group": "PROPERTIES AND VERBS",
    "title": "add_property()",
    "verb": "#42:explore_add_property",
    "body": "<p>Define a property with an initial value, owner, and permissions. Children inherit the definition.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Define a property with an initial value, owner, and permissions. Children\";\n\"inherit the definition.\";\nroom = create(#3);\nadd_property(room, \"score\", 10, {player, \"rw\"});\nreturn room.score;",
    "expected": "10",
    "expectedOutput": [],
    "edit": {
      "find": "\"score\", 10",
      "replace": "\"score\", 25",
      "expected": "25"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"score\", 10"
      },
      "With:",
      {
        "code": "\"score\", 25"
      },
      {
        "kind": "result",
        "code": "25"
      }
    ]
  },
  {
    "id": "builtin-set_property_info",
    "builtin": "set_property_info",
    "group": "PROPERTIES AND VERBS",
    "title": "set_property_info()",
    "verb": "#42:explore_set_property_info",
    "body": "<p>Update property metadata. A third list item renames a property defined on that object.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Update property metadata. A third list item renames a property defined on\";\n\"that object.\";\nroom = create(#3);\nadd_property(room, \"score\", 10, {player, \"rw\"});\nset_property_info(room, \"score\", {player, \"r\", \"points\"});\nreturn properties(room);",
    "expected": "{\"points\"}",
    "expectedOutput": [],
    "edit": {
      "find": "\"points\"",
      "replace": "\"total\"",
      "expected": "{\"total\"}"
    },
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"points\""
      },
      "With:",
      {
        "code": "\"total\""
      },
      {
        "kind": "result",
        "code": "{\"total\"}"
      }
    ]
  },
  {
    "id": "builtin-delete_property",
    "builtin": "delete_property",
    "group": "PROPERTIES AND VERBS",
    "title": "delete_property()",
    "verb": "#42:explore_delete_property",
    "body": "<p>Delete a locally defined property and its inherited slots.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Delete a locally defined property and its inherited slots.\";\nroom = create(#3);\nadd_property(room, \"score\", 10, {player, \"rw\"});\ndelete_property(room, \"score\");\nreturn properties(room);",
    "expected": "{}",
    "expectedOutput": [],
    "edit": {
      "find": "delete_property(room, \"score\");",
      "replace": "\"Keep the score property.\";",
      "expected": "{\"score\"}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "delete_property(room, \"score\");"
      },
      "With:",
      {
        "code": "\"Keep the score property.\";"
      },
      {
        "kind": "result",
        "code": "{\"score\"}"
      }
    ]
  },
  {
    "id": "builtin-is_clear_property",
    "builtin": "is_clear_property",
    "group": "PROPERTIES AND VERBS",
    "title": "is_clear_property()",
    "verb": "#42:explore_is_clear_property",
    "body": "<p>A clear inherited slot reads its value from the parent. Assigning a value creates an override. You cannot clear a local definition.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"A clear inherited slot reads its value from the parent. Assigning a value\";\n\"creates an override. You cannot clear a local definition.\";\nbase = create(#3);\nadd_property(base, \"score\", 10, {player, \"rw\"});\nchild = create(base);\nreturn is_clear_property(child, \"score\");",
    "expected": "1",
    "expectedOutput": [],
    "edit": {
      "find": "return is_clear_property",
      "replace": "child.score = 20;\nreturn is_clear_property",
      "expected": "0"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "return is_clear_property"
      },
      "With:",
      {
        "code": "child.score = 20;\nreturn is_clear_property"
      },
      {
        "kind": "result",
        "code": "0"
      }
    ]
  },
  {
    "id": "builtin-clear_property",
    "builtin": "clear_property",
    "group": "PROPERTIES AND VERBS",
    "title": "clear_property()",
    "verb": "#42:explore_clear_property",
    "body": "<p>Remove an inherited property override so reads use the parent value again.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Remove an inherited property override so reads use the parent value again.\";\nbase = create(#3);\nadd_property(base, \"score\", 10, {player, \"rw\"});\nchild = create(base);\nchild.score = 20;\nclear_property(child, \"score\");\nreturn child.score;",
    "expected": "10",
    "expectedOutput": [],
    "edit": {
      "find": "clear_property(child, \"score\");",
      "replace": "\"Keep the override.\";",
      "expected": "20"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "clear_property(child, \"score\");"
      },
      "With:",
      {
        "code": "\"Keep the override.\";"
      },
      {
        "kind": "result",
        "code": "20"
      }
    ]
  },
  {
    "id": "builtin-verbs",
    "builtin": "verbs",
    "group": "PROPERTIES AND VERBS",
    "title": "verbs()",
    "verb": "#42:explore_verbs",
    "body": "<p>List locally defined verb names. Generic Player <code>#6</code> defines tell; Learner <code>#7</code> inherits it, so <code class=\"builtin-name\" title=\"MOO builtin\">verbs</code>(player) is empty. A single verb can have several aliases separated by spaces.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Generic Player defines tell; Learner inherits it.\";\n\"verbs lists local definitions, not inherited verbs.\";\nreturn verbs($player);",
    "expected": "{\"tell notify\"}",
    "expectedOutput": [],
    "edit": {
      "find": "verbs($player)",
      "replace": "verbs(player)",
      "expected": "{}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "verbs($player)"
      },
      "With:",
      {
        "code": "verbs(player)"
      },
      {
        "kind": "result",
        "code": "{}"
      }
    ]
  },
  {
    "id": "builtin-add_verb",
    "builtin": "add_verb",
    "group": "PROPERTIES AND VERBS",
    "title": "add_verb()",
    "verb": "#42:explore_add_verb",
    "body": "<p>Create an empty verb with owner, permissions, names, and command argument metadata. Program its body with <code class=\"builtin-name\" title=\"MOO builtin\">set_verb_code</code>.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Create an empty verb with owner, permissions, names, and command argument\";\n\"metadata. Program its body with set_verb_code.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\nreturn verbs(room);",
    "expected": "{\"greet\"}",
    "expectedOutput": [],
    "edit": {
      "find": "\"greet\"",
      "replace": "\"hello wave\"",
      "expected": "{\"hello wave\"}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"greet\""
      },
      "With:",
      {
        "code": "\"hello wave\""
      },
      {
        "kind": "result",
        "code": "{\"hello wave\"}"
      }
    ]
  },
  {
    "id": "builtin-verb_info",
    "builtin": "verb_info",
    "group": "PROPERTIES AND VERBS",
    "title": "verb_info()",
    "verb": "#42:explore_verb_info",
    "body": "<p>Read verb owner, permissions, and names. A string descriptor looks up a verb by name.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Read verb owner, permissions, and names. A string descriptor looks up a verb\";\n\"by name.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\nreturn verb_info(room, \"greet\");",
    "expected": "{#7, \"rx\", \"greet\"}",
    "expectedOutput": [],
    "edit": {
      "find": "return verb_info(room, \"greet\");",
      "replace": "return verb_info(room, \"greet\")[1];",
      "expected": "#7"
    },
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "return verb_info(room, \"greet\");"
      },
      "With:",
      {
        "code": "return verb_info(room, \"greet\")[1];"
      },
      {
        "kind": "result",
        "code": "#7"
      }
    ]
  },
  {
    "id": "builtin-set_verb_info",
    "builtin": "set_verb_info",
    "group": "PROPERTIES AND VERBS",
    "title": "set_verb_info()",
    "verb": "#42:explore_set_verb_info",
    "body": "<p>Change a verb's owner, permissions, or aliases.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Change a verb's owner, permissions, or aliases.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\nset_verb_info(room, \"greet\", {player, \"rx\", \"hello wave\"});\nreturn verbs(room);",
    "expected": "{\"hello wave\"}",
    "expectedOutput": [],
    "edit": {
      "find": "\"hello wave\"",
      "replace": "\"welcome\"",
      "expected": "{\"welcome\"}"
    },
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"hello wave\""
      },
      "With:",
      {
        "code": "\"welcome\""
      },
      {
        "kind": "result",
        "code": "{\"welcome\"}"
      }
    ]
  },
  {
    "id": "builtin-verb_args",
    "builtin": "verb_args",
    "group": "PROPERTIES AND VERBS",
    "title": "verb_args()",
    "verb": "#42:explore_verb_args",
    "body": "<p>Inspect direct object, preposition, and indirect object specifications. These describe commands; command dispatch is not implemented here.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Inspect direct object, preposition, and indirect object specifications.\";\n\"These describe commands; command dispatch is not implemented here.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\nreturn verb_args(room, \"greet\");",
    "expected": "{\"this\", \"none\", \"this\"}",
    "expectedOutput": [],
    "edit": {
      "find": "{\"this\", \"none\", \"this\"}",
      "replace": "{\"any\", \"none\", \"any\"}",
      "expected": "{\"any\", \"none\", \"any\"}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "{\"this\", \"none\", \"this\"}"
      },
      "With:",
      {
        "code": "{\"any\", \"none\", \"any\"}"
      },
      {
        "kind": "result",
        "code": "{\"any\", \"none\", \"any\"}"
      }
    ]
  },
  {
    "id": "builtin-set_verb_args",
    "builtin": "set_verb_args",
    "group": "PROPERTIES AND VERBS",
    "title": "set_verb_args()",
    "verb": "#42:explore_set_verb_args",
    "body": "<p>Update a verb's command argument metadata. Explicit object:verb calls still receive the values you pass.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Update a verb's command argument metadata. Explicit object:verb calls still\";\n\"receive the values you pass.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\nset_verb_args(room, \"greet\", {\"any\", \"none\", \"any\"});\nreturn verb_args(room, \"greet\");",
    "expected": "{\"any\", \"none\", \"any\"}",
    "expectedOutput": [],
    "edit": {
      "find": "{\"any\", \"none\", \"any\"}",
      "replace": "{\"none\", \"none\", \"none\"}",
      "expected": "{\"none\", \"none\", \"none\"}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "{\"any\", \"none\", \"any\"}"
      },
      "With:",
      {
        "code": "{\"none\", \"none\", \"none\"}"
      },
      {
        "kind": "result",
        "code": "{\"none\", \"none\", \"none\"}"
      }
    ]
  },
  {
    "id": "builtin-set_verb_code",
    "builtin": "set_verb_code",
    "group": "PROPERTIES AND VERBS",
    "title": "set_verb_code()",
    "verb": "#42:explore_set_verb_code",
    "body": "<p>Compile source lines into a stored verb. An empty returned list means success; compile errors return messages and preserve the old code.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Compile source lines into a stored verb. An empty returned list means\";\n\"success; compile errors return messages and preserve the old code.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\nerrors = set_verb_code(room, \"greet\", {\"return 6 * 7;\"});\nnotify(player, toliteral(errors));\nreturn room:greet();",
    "expected": "42",
    "expectedOutput": [
      "{}"
    ],
    "edit": {
      "find": "6 * 7",
      "replace": "6 * 8",
      "expected": "48"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "6 * 7"
      },
      "With:",
      {
        "code": "6 * 8"
      },
      {
        "kind": "result",
        "code": "48"
      }
    ]
  },
  {
    "id": "builtin-verb_code",
    "builtin": "verb_code",
    "group": "PROPERTIES AND VERBS",
    "title": "verb_code()",
    "verb": "#42:explore_verb_code",
    "body": "<p>Read stored source as a list of lines. Optional formatting flags only support <code>0</code> in this runtime.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Read stored source as a list of lines. Optional formatting flags only\";\n\"support 0 in this runtime.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\nset_verb_code(room, \"greet\", {\"return 42;\"});\nreturn verb_code(room, \"greet\");",
    "expected": "{\"return 42;\"}",
    "expectedOutput": [],
    "edit": {
      "find": "return 42;",
      "replace": "return 99;",
      "expected": "{\"return 99;\"}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "return 42;"
      },
      "With:",
      {
        "code": "return 99;"
      },
      {
        "kind": "result",
        "code": "{\"return 99;\"}"
      }
    ]
  },
  {
    "id": "builtin-delete_verb",
    "builtin": "delete_verb",
    "group": "PROPERTIES AND VERBS",
    "title": "delete_verb()",
    "verb": "#42:explore_delete_verb",
    "body": "<p>Remove a locally defined verb by name or numeric descriptor.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Remove a locally defined verb by name or numeric descriptor.\";\nroom = create(#3);\nadd_verb(room, {player, \"rx\", \"greet\"}, {\"this\", \"none\", \"this\"});\ndelete_verb(room, \"greet\");\nreturn verbs(room);",
    "expected": "{}",
    "expectedOutput": [],
    "edit": {
      "find": "delete_verb(room, \"greet\");",
      "replace": "\"Keep the verb.\";",
      "expected": "{\"greet\"}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "delete_verb(room, \"greet\");"
      },
      "With:",
      {
        "code": "\"Keep the verb.\";"
      },
      {
        "kind": "result",
        "code": "{\"greet\"}"
      }
    ]
  },
  {
    "id": "builtin-respond_to",
    "builtin": "respond_to",
    "profiles": [
      "toaststunt"
    ],
    "group": "PROPERTIES AND VERBS",
    "title": "respond_to()",
    "verb": "#42:explore_respond_to",
    "body": "<p>Find a callable verb through inheritance.</p>",
    "code": "\"Find a callable verb through inheritance.\";\nreturn respond_to(#7,\"tell\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#6, \"tell notify\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Ask whether <code>#42</code> responds to <code>\"tell\"</code>. A room does not inherit from Generic Player."
    ]
  },
  {
    "id": "builtin-pass",
    "builtin": "pass",
    "group": "PROPERTIES AND VERBS",
    "title": "pass()",
    "verb": "#42:explore_pass",
    "body": "<p>Call the ancestor implementation of the current verb. pass needs a stored verb call frame; it cannot run directly at the top level.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Call the ancestor implementation of the current verb. pass needs a stored\";\n\"verb call frame; it cannot run directly at the top level.\";\nbase = create(#3);\nchild = create(base);\nadd_verb(base, {player, \"rx\", \"calculate\"}, {\"this\", \"none\", \"this\"});\nset_verb_code(base, \"calculate\", {\"return args[1] * 2;\"});\nadd_verb(child, {player, \"rx\", \"calculate\"}, {\"this\", \"none\", \"this\"});\n\"Splice args into the ancestor call, then add one to its result.\";\nset_verb_code(child, \"calculate\", {\"return pass(@args) + 1;\"});\nreturn child:calculate(3);",
    "expected": "7",
    "expectedOutput": [],
    "edit": {
      "find": "calculate(3)",
      "replace": "calculate(5)",
      "expected": "11"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "calculate(3)"
      },
      "With:",
      {
        "code": "calculate(5)"
      },
      {
        "kind": "result",
        "code": "11"
      }
    ]
  },
  {
    "id": "builtin-raise",
    "builtin": "raise",
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "raise()",
    "verb": "#42:explore_raise",
    "body": "<p>Raise an error deliberately and recover with try/except. The caught list includes the error code, message, and supplied value.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Raise an error deliberately and recover with try/except. The caught list\";\n\"includes the error code, message, and supplied value.\";\ntry\n  raise(E_INVARG, \"Choose a positive score\", 0);\nexcept problem (E_INVARG)\n  return problem[2];\nendtry",
    "expected": "\"Choose a positive score\"",
    "expectedOutput": [],
    "edit": {
      "find": "\"Choose a positive score\"",
      "replace": "\"Try a larger score\"",
      "expected": "\"Try a larger score\""
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"Choose a positive score\""
      },
      "With:",
      {
        "code": "\"Try a larger score\""
      },
      {
        "kind": "result",
        "code": "\"Try a larger score\""
      }
    ]
  },
  {
    "id": "builtin-function_info",
    "builtin": "function_info",
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "function_info()",
    "verb": "#42:explore_function_info",
    "body": "<p>Inspect a builtin signature: name, minimum arguments, maximum arguments, and argument type codes. Maximum -<code>1</code> means unlimited; type -<code>1</code> means any. Omit the name to list all builtins. Return type descriptions are in Reference.</p>",
    "hint": [
      "Use Restore Example to start over.",
      "A successful run marks this example explored; your edits do not have to match the original result."
    ],
    "code": "\"Inspect a builtin signature: name, minimum arguments, maximum arguments, and\";\n\"argument type codes. Maximum -1 means unlimited; type -1 means any. Omit the\";\n\"name to list all builtins. Return type descriptions are in Reference.\";\nreturn function_info(\"notify\");",
    "expected": "{\"notify\", 2, 2, {1, 2}}",
    "expectedOutput": [],
    "edit": {
      "find": "\"notify\"",
      "replace": "\"length\"",
      "expected": "{\"length\", 1, 1, {-1}}"
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Replace:",
      {
        "code": "\"notify\""
      },
      "With:",
      {
        "code": "\"length\""
      },
      {
        "kind": "result",
        "code": "{\"length\", 1, 1, {-1}}"
      }
    ]
  },
  {
    "id": "builtin-call_function",
    "builtin": "call_function",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "call_function()",
    "verb": "#42:explore_call_function",
    "body": "<p>Call a builtin by name.</p>",
    "code": "\"Call a builtin by name.\";\nreturn call_function(\"length\",{1,2});",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace <code>\"length\"</code> with <code>\"tostr\"</code> and pass one integer argument. Dispatch uses the named builtin’s signature."
    ]
  },
  {
    "id": "builtin-eval",
    "builtin": "eval",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "eval()",
    "verb": "#42:explore_eval",
    "body": "<p>Compile and execute MOO source in a fresh local scope.</p>",
    "code": "\"Compile and execute MOO source in a fresh local scope.\";\nreturn eval(\"return 6 * 7;\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1, 42}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the nested source to <code>\"return 6 + 7;\"</code>. The outer list reports success and the returned value."
    ]
  },
  {
    "id": "builtin-callers",
    "builtin": "callers",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "callers()",
    "verb": "#42:explore_callers",
    "body": "<p>Inspect the current call stack.</p>",
    "code": "\"Inspect the current call stack.\";\nreturn callers();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Define a verb that returns <code>callers()</code>, then call it. A nested call has a caller frame whereas top-level execution has none."
    ]
  },
  {
    "id": "builtin-task_id",
    "builtin": "task_id",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "task_id()",
    "verb": "#42:explore_task_id",
    "body": "<p>Inspect the identity of this execution.</p>",
    "code": "\"Inspect the identity of this execution.\";\nreturn task_id();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "76",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Run again and compare; this is not a queue of schedulable tasks."
    ]
  },
  {
    "id": "builtin-task_perms",
    "builtin": "task_perms",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "task_perms()",
    "verb": "#42:explore_task_perms",
    "body": "<p>Inspect frame programmer identity.</p>",
    "code": "\"Inspect frame programmer identity.\";\nreturn task_perms();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "#7",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call from a verb owned by a different valid object and compare the programmer identity."
    ]
  },
  {
    "id": "builtin-caller_perms",
    "builtin": "caller_perms",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "caller_perms()",
    "verb": "#42:explore_caller_perms",
    "body": "<p>Inspect frame programmer identity.</p>",
    "code": "\"Inspect frame programmer identity.\";\nreturn caller_perms();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "#-1",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call from a nested verb and compare with the top-level <code>#-1</code> result."
    ]
  },
  {
    "id": "builtin-set_task_perms",
    "builtin": "set_task_perms",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "set_task_perms()",
    "verb": "#42:explore_set_task_perms",
    "body": "<p>Change the current frame programmer.</p>",
    "code": "\"Change the current frame programmer.\";\nreturn set_task_perms(player);",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · SERVER PERMISSIONS: Metadata and selected identity checks are modeled, but general MOO permission enforcement is absent. A successful operation here does not prove authorization on a real server.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>task_perms()</code> after the call. Switching to a different identity requires the supported wizard check; general permissions are still incomplete."
    ]
  },
  {
    "id": "builtin-task_local",
    "builtin": "task_local",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "task_local()",
    "verb": "#42:explore_task_local",
    "body": "<p>Read data shared by frames in this run.</p>",
    "code": "\"Read data shared by frames in this run.\";\nreturn task_local();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call <code>set_task_local(\"note\")</code> before <code>task_local()</code>. Start a new run and observe that it resets."
    ]
  },
  {
    "id": "builtin-set_task_local",
    "builtin": "set_task_local",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "set_task_local()",
    "verb": "#42:explore_set_task_local",
    "body": "<p>Set data shared by frames in this run.</p>",
    "code": "\"Set data shared by frames in this run.\";\nreturn set_task_local({1,2});",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Store <code>\"note\"</code>, then return <code>task_local()</code>. These values do not survive a new execution."
    ]
  },
  {
    "id": "builtin-ticks_left",
    "builtin": "ticks_left",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "ticks_left()",
    "verb": "#42:explore_ticks_left",
    "body": "<p>Inspect remaining evaluator steps.</p>",
    "code": "\"Inspect remaining evaluator steps.\";\nreturn ticks_left();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "99997",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Call ticks_left before and after a short loop, returning both values."
    ]
  },
  {
    "id": "builtin-seconds_left",
    "builtin": "seconds_left",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "seconds_left()",
    "verb": "#42:explore_seconds_left",
    "body": "<p>Inspect the remaining execution time budget.</p>",
    "code": "\"Inspect the remaining execution time budget.\";\nreturn seconds_left();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "30",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Return seconds_left twice in a list. Time values are not deterministic."
    ]
  },
  {
    "id": "builtin-time",
    "builtin": "time",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "time()",
    "verb": "#42:explore_time",
    "body": "<p>Read the current Unix timestamp.</p>",
    "code": "\"Read the current Unix timestamp.\";\nreturn time();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "1789531253",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Run again later; the value depends on wall time."
    ]
  },
  {
    "id": "builtin-ctime",
    "builtin": "ctime",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "ctime()",
    "verb": "#42:explore_ctime",
    "body": "<p>Format a Unix timestamp as a readable date.</p>",
    "code": "\"Format a Unix timestamp as a readable date.\";\nreturn ctime(0);",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"Thu Jan  1 00:00:00 1970 UTC\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Replace timestamp <code>0</code> with <code>86400</code>. The displayed UTC date advances one day."
    ]
  },
  {
    "id": "builtin-ftime",
    "builtin": "ftime",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXECUTION, ERRORS AND TIME",
    "title": "ftime()",
    "verb": "#42:explore_ftime",
    "body": "<p>Read a high-resolution host clock value.</p>",
    "code": "\"Read a high-resolution host clock value.\";\nreturn ftime();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "EDUCATIONAL RUNTIME: Time/budget/task values describe this execution. ctime uses UTC; ticks count evaluator steps. Task-local values last for one run. Bounded suspend(seconds) is available in workers; no multi-task scheduler, fork or resume is available.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "1789531253.887",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Run again and compare the returned value."
    ]
  },
  {
    "id": "builtin-random",
    "builtin": "random",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "random()",
    "verb": "#42:explore_random",
    "body": "<p>Choose an integer from <code>1</code> through <code>6</code>.</p>",
    "code": "\"Choose an integer from 1 through 6.\";\nreturn random(6);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "4",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Change <code>6</code> to <code>20</code> and run several times."
    ]
  },
  {
    "id": "builtin-frandom",
    "builtin": "frandom",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "frandom()",
    "verb": "#42:explore_frandom",
    "body": "<p>Choose a floating-point random value.</p>",
    "code": "\"Choose a floating-point random value.\";\nreturn frandom(1.0);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "0.13617450686832822",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Change the upper bound to <code>10.0</code>."
    ]
  },
  {
    "id": "builtin-random_bytes",
    "builtin": "random_bytes",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "random_bytes()",
    "verb": "#42:explore_random_bytes",
    "body": "<p>Generate four random bytes in binary-string form.</p>",
    "code": "\"Generate four random bytes in binary-string form.\";\nreturn random_bytes(4);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "dynamic": true,
    "expected": "\"5~A9OD\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Run the example and inspect the return value.",
      "Change the requested length to <code>8</code>."
    ]
  },
  {
    "id": "builtin-reseed_random",
    "builtin": "reseed_random",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "reseed_random()",
    "verb": "#42:explore_reseed_random",
    "body": "<p>Compatibility no-op for a generator that draws fresh host entropy.</p>",
    "code": "\"Compatibility no-op for a generator that draws fresh host entropy.\";\nreturn reseed_random();",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · NO-OP: Returns 0 without seeding a generator; random calls use fresh Web Crypto entropy.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Run again with a different integer seed argument. The result stays zero; this no-op does not make later random values repeatable."
    ]
  },
  {
    "id": "builtin-string_hash",
    "builtin": "string_hash",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "string_hash()",
    "verb": "#42:explore_string_hash",
    "body": "<p>Compute a cryptographic digest.</p>",
    "code": "\"Compute a cryptographic digest.\";\nreturn string_hash(\"abc\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD\"",
    "profileOverrides": {
      "lambdamoo": {
        "expected": "\"900150983CD24FB0D6963F7D28E17F72\"",
        "map": "Expected result from running the starter code (prepared world): \"900150983CD24FB0D6963F7D28E17F72\""
      }
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"abc\"</code> to <code>\"abd\"</code>. The deterministic digest changes substantially."
    ]
  },
  {
    "id": "builtin-binary_hash",
    "builtin": "binary_hash",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "binary_hash()",
    "verb": "#42:explore_binary_hash",
    "body": "<p>Compute a cryptographic digest.</p>",
    "code": "\"Compute a cryptographic digest.\";\nreturn binary_hash(\"a~62c\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD\"",
    "profileOverrides": {
      "lambdamoo": {
        "expected": "\"900150983CD24FB0D6963F7D28E17F72\"",
        "map": "Expected result from running the starter code (prepared world): \"900150983CD24FB0D6963F7D28E17F72\""
      }
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Compare the escaped binary representation with a string_hash of the same printable bytes."
    ]
  },
  {
    "id": "builtin-value_hash",
    "builtin": "value_hash",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "value_hash()",
    "verb": "#42:explore_value_hash",
    "body": "<p>Compute a cryptographic digest.</p>",
    "code": "\"Compute a cryptographic digest.\";\nreturn value_hash(1);",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B\"",
    "profileOverrides": {
      "lambdamoo": {
        "expected": "\"C4CA4238A0B923820DCC509A6F75849B\"",
        "map": "Expected result from running the starter code (prepared world): \"C4CA4238A0B923820DCC509A6F75849B\""
      }
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Hash a string <code>\"1\"</code> instead of integer <code>1</code>. Literal representation and type affect the digest."
    ]
  },
  {
    "id": "builtin-string_hmac",
    "builtin": "string_hmac",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "string_hmac()",
    "verb": "#42:explore_string_hmac",
    "body": "<p>Compute a keyed HMAC.</p>",
    "code": "\"Compute a keyed HMAC.\";\nreturn string_hmac(\"abc\",\"key\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"9C196E32DC0175F86F4B1CB89289D6619DE6BEE699E4C378E68309ED97A1A6AB\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the key while keeping the message. HMAC combines both inputs."
    ]
  },
  {
    "id": "builtin-binary_hmac",
    "builtin": "binary_hmac",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "binary_hmac()",
    "verb": "#42:explore_binary_hmac",
    "body": "<p>Compute a keyed HMAC.</p>",
    "code": "\"Compute a keyed HMAC.\";\nreturn binary_hmac(\"a~62c\",\"key\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"9C196E32DC0175F86F4B1CB89289D6619DE6BEE699E4C378E68309ED97A1A6AB\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change one byte of the key and compare the result."
    ]
  },
  {
    "id": "builtin-value_hmac",
    "builtin": "value_hmac",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "value_hmac()",
    "verb": "#42:explore_value_hmac",
    "body": "<p>Compute a keyed HMAC.</p>",
    "code": "\"Compute a keyed HMAC.\";\nreturn value_hmac(\"abc\",\"key\") == string_hmac(toliteral(\"abc\"),\"key\");",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the value on only one side of the equality; the comparison becomes false."
    ]
  },
  {
    "id": "builtin-crypt",
    "builtin": "crypt",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "crypt()",
    "verb": "#42:explore_crypt",
    "body": "<p>Compute a traditional DES Unix crypt hash.</p>",
    "code": "\"Compute a traditional DES Unix crypt hash.\";\nreturn crypt(\"foobar\",\"J3\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · TRADITIONAL DES: Only traditional DES crypt/salt formats are supported. This legacy algorithm is unsuitable for password storage; modular crypt formats are rejected.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"J3fSFQfgkp26w\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the password but keep the two-character salt. The legacy DES hash changes; this is not a modern password-storage example."
    ]
  },
  {
    "id": "builtin-salt",
    "builtin": "salt",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "salt()",
    "verb": "#42:explore_salt",
    "body": "<p>Build a traditional DES salt from binary input bytes.</p>",
    "code": "\"Build a traditional DES salt from binary input bytes.\";\nreturn salt(\"\",\"~00~01\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · TRADITIONAL DES: Only traditional DES crypt/salt formats are supported. This legacy algorithm is unsuitable for password storage; modular crypt formats are rejected.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"./\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the supplied entropy bytes, keeping the empty prefix. Only traditional DES salts are implemented."
    ]
  },
  {
    "id": "builtin-argon2",
    "builtin": "argon2",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "argon2()",
    "verb": "#42:explore_argon2",
    "body": "<p>Compute an Argon2id password hash in PHC format.</p>",
    "code": "\"Compute an Argon2id password hash in PHC format.\";\nreturn argon2(\"password\",\"saltsalt\",1,8);",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · BOUNDED ARGON2ID: A real Argon2id implementation with capped resources. Example parameters are deliberately small for demonstration, not production password-storage settings.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"$argon2id$v=19$m=8,t=1,p=1$c2FsdHNhbHQ$ePHX6tepXWusf6b6MH9TJ+SVGted3R/FtCkxq/X5UVo\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the password but keep the salt and tiny demonstration parameters. Never use these settings as production guidance."
    ]
  },
  {
    "id": "builtin-argon2_verify",
    "builtin": "argon2_verify",
    "profiles": [
      "toaststunt"
    ],
    "group": "RANDOMNESS AND CRYPTOGRAPHY",
    "title": "argon2_verify()",
    "verb": "#42:explore_argon2_verify",
    "body": "<p>Verify a supported Argon2id PHC hash.</p>",
    "code": "\"Verify a supported Argon2id PHC hash.\";\nreturn argon2_verify(\"$argon2id$v=19$m=8,t=1,p=1$c2FsdHNhbHQ$ePHX6tepXWusf6b6MH9TJ+SVGted3R/FtCkxq/X5UVo\",\"password\");",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · BOUNDED ARGON2ID: A real Argon2id implementation with capped resources. Example parameters are deliberately small for demonstration, not production password-storage settings.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the candidate password to <code>\"wrong\"</code>. Verification should return <code>0</code>."
    ]
  },
  {
    "id": "builtin-file_handles",
    "builtin": "file_handles",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_handles()",
    "verb": "#42:explore_file_handles",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_handles</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: handles.\";\nreturn file_handles();",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Open another file before this call, then inspect both handles. Close one and compare."
    ]
  },
  {
    "id": "builtin-file_open",
    "builtin": "file_open",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_open()",
    "verb": "#42:explore_file_open",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_open</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: open.\";\nreturn file_open(\"/new\",\"w+tn\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change /new to /journal. Capture the returned handle and inspect it with file_name."
    ]
  },
  {
    "id": "builtin-file_close",
    "builtin": "file_close",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_close()",
    "verb": "#42:explore_file_close",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_close</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: close.\";\nreturn file_close(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>file_handles()</code> after closing handle <code>1</code>. Repeating the close raises an invalid-handle error."
    ]
  },
  {
    "id": "builtin-file_name",
    "builtin": "file_name",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_name()",
    "verb": "#42:explore_file_name",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_name</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: name.\";\nreturn file_name(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"/lesson\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Open a differently named file and pass its returned handle to file_name."
    ]
  },
  {
    "id": "builtin-file_openmode",
    "builtin": "file_openmode",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_openmode()",
    "verb": "#42:explore_file_openmode",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_openmode</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: openmode.\";\nreturn file_openmode(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"r+tn\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Open a file using <code>\"w+tn\"</code> and inspect its mode. Opening with w truncates its contents."
    ]
  },
  {
    "id": "builtin-file_readline",
    "builtin": "file_readline",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_readline()",
    "verb": "#42:explore_file_readline",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_readline</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: readline.\";\nreturn file_readline(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"ab\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Run twice without resetting. The first line is ab and the second is cd because the handle position advances."
    ]
  },
  {
    "id": "builtin-file_readlines",
    "builtin": "file_readlines",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_readlines()",
    "verb": "#42:explore_file_readlines",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_readlines</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: readlines.\";\nreturn file_readlines(1,1,2);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{\"ab\", \"cd\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the ending line from <code>2</code> to <code>1</code>. This operation restores the previous handle position afterward."
    ]
  },
  {
    "id": "builtin-file_read",
    "builtin": "file_read",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_read()",
    "verb": "#42:explore_file_read",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_read</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: read.\";\nreturn file_read(1,3);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"ab\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the requested byte <code>count</code> from <code>3</code> to <code>1</code> and compare the returned text and file_tell."
    ]
  },
  {
    "id": "builtin-file_write",
    "builtin": "file_write",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_write()",
    "verb": "#42:explore_file_write",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_write</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: write.\";\nreturn file_write(1,\"xy\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Write <code>\"longer\"</code> and inspect the returned byte <code>count</code>. Rewind with file_seek before reading it back."
    ]
  },
  {
    "id": "builtin-file_writeline",
    "builtin": "file_writeline",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_writeline()",
    "verb": "#42:explore_file_writeline",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_writeline</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: writeline.\";\nreturn file_writeline(1,\"hello\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"hello\"</code> to <code>\"goodbye\"</code>, then rewind and read the first line. Return <code>0</code> signals success, not the written text."
    ]
  },
  {
    "id": "builtin-file_grep",
    "builtin": "file_grep",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_grep()",
    "verb": "#42:explore_file_grep",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_grep</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: grep.\";\nreturn file_grep(1,\"CD\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{{\"cd\", 2}}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Search for <code>\"ab\"</code> instead of <code>\"CD\"</code>. The result includes matching text and line number."
    ]
  },
  {
    "id": "builtin-file_seek",
    "builtin": "file_seek",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_seek()",
    "verb": "#42:explore_file_seek",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_seek</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: seek.\";\nreturn file_seek(1,2,\"SEEK_SET\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the offset from <code>2</code> to <code>0</code>, then return <code>file_tell(1)</code>."
    ]
  },
  {
    "id": "builtin-file_tell",
    "builtin": "file_tell",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_tell()",
    "verb": "#42:explore_file_tell",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_tell</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: tell.\";\nreturn file_tell(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Read a line before calling file_tell. The returned cursor position advances."
    ]
  },
  {
    "id": "builtin-file_eof",
    "builtin": "file_eof",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_eof()",
    "verb": "#42:explore_file_eof",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_eof</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: eof.\";\nreturn file_eof(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Read through the file, then attempt another read and inspect file_eof. Rewind and compare."
    ]
  },
  {
    "id": "builtin-file_flush",
    "builtin": "file_flush",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_flush()",
    "verb": "#42:explore_file_flush",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_flush</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: flush.\";\nreturn file_flush(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Write to the file, flush, then rewind and read it. Virtual writes already commit immediately; flush returns <code>0</code>."
    ]
  },
  {
    "id": "builtin-file_count_lines",
    "builtin": "file_count_lines",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_count_lines()",
    "verb": "#42:explore_file_count_lines",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_count_lines</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: count lines.\";\nreturn file_count_lines(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Append a line and rewind, then <code>count</code> again. Inspect the <code>count</code> and the original cursor position."
    ]
  },
  {
    "id": "builtin-file_list",
    "builtin": "file_list",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_list()",
    "verb": "#42:explore_file_list",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_list</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: list.\";\nreturn file_list(\"/\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{\"empty\", \"lesson\", \"remove\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "List <code>\"/empty\"</code> instead of <code>\"/\"</code>. It initially contains no entries."
    ]
  },
  {
    "id": "builtin-file_mkdir",
    "builtin": "file_mkdir",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_mkdir()",
    "verb": "#42:explore_file_mkdir",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_mkdir</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: mkdir.\";\nreturn file_mkdir(\"/dir\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>file_list(\"/\")</code> after creating the directory. Creating the same directory again fails."
    ]
  },
  {
    "id": "builtin-file_rmdir",
    "builtin": "file_rmdir",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_rmdir()",
    "verb": "#42:explore_file_rmdir",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_rmdir</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: rmdir.\";\nreturn file_rmdir(\"/empty\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>file_list(\"/\")</code> after removing /empty. Only an empty directory can be removed."
    ]
  },
  {
    "id": "builtin-file_remove",
    "builtin": "file_remove",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_remove()",
    "verb": "#42:explore_file_remove",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_remove</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: remove.\";\nreturn file_remove(\"/remove\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>file_list(\"/\")</code> after deleting /remove. Open files cannot be removed by this virtual filesystem."
    ]
  },
  {
    "id": "builtin-file_rename",
    "builtin": "file_rename",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_rename()",
    "verb": "#42:explore_file_rename",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_rename</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: rename.\";\nreturn file_rename(\"/remove\",\"/renamed\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use /archive as the destination, then list /. Existing destinations are not overwritten."
    ]
  },
  {
    "id": "builtin-file_chmod",
    "builtin": "file_chmod",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_chmod()",
    "verb": "#42:explore_file_chmod",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_chmod</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: chmod.\";\nreturn file_chmod(\"/lesson\",\"600\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"600\"</code> to <code>\"644\"</code>, then inspect file_mode. This changes metadata, not host operating-system permissions."
    ]
  },
  {
    "id": "builtin-file_size",
    "builtin": "file_size",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_size()",
    "verb": "#42:explore_file_size",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_size</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: size.\";\nreturn file_size(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "6",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Write more bytes, then inspect the new size. A file handle’s cursor is separate from total size."
    ]
  },
  {
    "id": "builtin-file_mode",
    "builtin": "file_mode",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_mode()",
    "verb": "#42:explore_file_mode",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_mode</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: mode.\";\nreturn file_mode(\"/lesson\");",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"644\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use <code>file_chmod(\"/lesson\",\"600\")</code> first, then inspect the stored mode."
    ]
  },
  {
    "id": "builtin-file_type",
    "builtin": "file_type",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_type()",
    "verb": "#42:explore_file_type",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_type</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: type.\";\nreturn file_type(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"reg\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Inspect <code>file_type(\"/empty\")</code> to compare a directory with a regular file."
    ]
  },
  {
    "id": "builtin-file_last_access",
    "builtin": "file_last_access",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_last_access()",
    "verb": "#42:explore_file_last_access",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_last_access</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: last access.\";\nreturn file_last_access(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Read from handle <code>1</code>, then inspect the access timestamp. It is a logical counter here."
    ]
  },
  {
    "id": "builtin-file_last_modify",
    "builtin": "file_last_modify",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_last_modify()",
    "verb": "#42:explore_file_last_modify",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_last_modify</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: last modify.\";\nreturn file_last_modify(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "3",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Write to handle <code>1</code>, then inspect the modification timestamp. It is a logical counter here."
    ]
  },
  {
    "id": "builtin-file_last_change",
    "builtin": "file_last_change",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_last_change()",
    "verb": "#42:explore_file_last_change",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_last_change</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: last change.\";\nreturn file_last_change(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change metadata with file_chmod and compare the logical change timestamp."
    ]
  },
  {
    "id": "builtin-file_stat",
    "builtin": "file_stat",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL FILES",
    "title": "file_stat()",
    "verb": "#42:explore_file_stat",
    "body": "<p>Simulated filesystem: <code class=\"builtin-name\" title=\"MOO builtin\">file_stat</code>.</p><p>The prepared lesson world supplies a virtual /lesson file, open handle <code>1</code>, and empty/removable entries. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated filesystem: stat.\";\nreturn file_stat(1);",
    "host": "files",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · VIRTUAL FILESYSTEM: Files and handles live in this track’s saved world, not your computer. Permissions are metadata and timestamps are logical counters. Load the lesson checkpoint for /lesson and handle 1; these can change after earlier experiments.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{6, \"reg\", \"644\", \"\", \"\", 2, 3, 1}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Compare the complete stat list before and after writing. Use individual file_* queries to identify each field."
    ]
  },
  {
    "id": "builtin-connected_players",
    "builtin": "connected_players",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "connected_players()",
    "verb": "#42:explore_connected_players",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">connected_players</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: connected players.\";\nreturn connected_players();",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{#7}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call <code>boot_player(#7)</code>, then list connections again. The object still exists even after its virtual connection is removed."
    ]
  },
  {
    "id": "builtin-connected_seconds",
    "builtin": "connected_seconds",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "connected_seconds()",
    "verb": "#42:explore_connected_seconds",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">connected_seconds</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: connected seconds.\";\nreturn connected_seconds(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Perform another virtual connection operation and call again. The value counts operations, not real elapsed seconds."
    ]
  },
  {
    "id": "builtin-idle_seconds",
    "builtin": "idle_seconds",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "idle_seconds()",
    "verb": "#42:explore_idle_seconds",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">idle_seconds</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: idle seconds.\";\nreturn idle_seconds(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Consume input with <code>read(#7,1)</code>, then compare the idle counter."
    ]
  },
  {
    "id": "builtin-connection_name",
    "builtin": "connection_name",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "connection_name()",
    "verb": "#42:explore_connection_name",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">connection_name</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: connection name.\";\nreturn connection_name(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"virtual:7\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Compare the name for a configured outbound connection. Names are simulation labels."
    ]
  },
  {
    "id": "builtin-connection_name_lookup",
    "builtin": "connection_name_lookup",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "connection_name_lookup()",
    "verb": "#42:explore_connection_name_lookup",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">connection_name_lookup</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: connection name lookup.\";\nreturn connection_name_lookup(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"virtual:7\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Repeat the lookup. This returns a stored label; it does not perform DNS."
    ]
  },
  {
    "id": "builtin-connection_option",
    "builtin": "connection_option",
    "profiles": [
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "connection_option()",
    "verb": "#42:explore_connection_option",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">connection_option</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: connection option.\";\nreturn connection_option(#7,\"client-echo\");",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Set <code>\"client-echo\"</code> to <code>0</code>, then query it again."
    ]
  },
  {
    "id": "builtin-connection_options",
    "builtin": "connection_options",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "connection_options()",
    "verb": "#42:explore_connection_options",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">connection_options</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: connection options.\";\nreturn connection_options(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{{\"binary\", 0}, {\"hold-input\", 0}, {\"client-echo\", 1}, {\"disable-oob\", 0}}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Set <code>\"hold-input\"</code> to <code>1</code> and inspect the complete option list."
    ]
  },
  {
    "id": "builtin-set_connection_option",
    "builtin": "set_connection_option",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "set_connection_option()",
    "verb": "#42:explore_set_connection_option",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">set_connection_option</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: set connection option.\";\nreturn set_connection_option(#7,\"binary\",1);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "After setting <code>\"binary\"</code>, return <code>connection_options(#7)</code>. Options are stored flags, not a live protocol."
    ]
  },
  {
    "id": "builtin-connection_info",
    "builtin": "connection_info",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "connection_info()",
    "verb": "#42:explore_connection_info",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">connection_info</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: connection info.\";\nreturn connection_info(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "[\"destination_address\" -> \"educational-host\", \"destination_ip\" -> \"virtual\", \"destination_port\" -> 0, \"outbound\" -> 0, \"protocol\" -> \"virtual\", \"source_address\" -> \"virtual:7\", \"source_ip\" -> \"virtual\", \"source_port\" -> 0]",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Create an outbound fixture connection and inspect its info. Network-address fields are simulation placeholders."
    ]
  },
  {
    "id": "builtin-boot_player",
    "builtin": "boot_player",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "boot_player()",
    "verb": "#42:explore_boot_player",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">boot_player</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: boot player.\";\nreturn boot_player(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>connected_players()</code> after booting. No real learner is disconnected."
    ]
  },
  {
    "id": "builtin-buffered_output_length",
    "builtin": "buffered_output_length",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "buffered_output_length()",
    "verb": "#42:explore_buffered_output_length",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">buffered_output_length</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: buffered output length.\";\nreturn buffered_output_length(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call <code>notify(player,\"hello\")</code> first. The buffered character <code>count</code> increases by five."
    ]
  },
  {
    "id": "builtin-output_delimiters",
    "builtin": "output_delimiters",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "output_delimiters()",
    "verb": "#42:explore_output_delimiters",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">output_delimiters</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: output delimiters.\";\nreturn output_delimiters(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{\"\", \"\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Inspect the returned prefix/suffix strings. Empty defaults are stored in the configured connection; this builtin does not set them."
    ]
  },
  {
    "id": "builtin-force_input",
    "builtin": "force_input",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "force_input()",
    "verb": "#42:explore_force_input",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">force_input</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: force input.\";\nreturn force_input(#7,\"new\");",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Add <code>\"new\"</code>, then call read twice to observe queue order. A truthy final argument inserts at the front."
    ]
  },
  {
    "id": "builtin-flush_input",
    "builtin": "flush_input",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "flush_input()",
    "verb": "#42:explore_flush_input",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">flush_input</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: flush input.\";\nreturn flush_input(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Flush and then use <code>read(#7,1)</code>. The empty nonblocking read returns <code>0</code>."
    ]
  },
  {
    "id": "builtin-switch_player",
    "builtin": "switch_player",
    "profiles": [
      "toaststunt"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "switch_player()",
    "verb": "#42:explore_switch_player",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">switch_player</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: switch player.\";\nreturn switch_player(#7,#42);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "After switching to <code>#42</code>, inspect <code>connected_players()</code>. This reassigns a virtual connection, not a logged-in user."
    ]
  },
  {
    "id": "builtin-read",
    "builtin": "read",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "read()",
    "verb": "#42:explore_read",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">read</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: read.\";\nreturn read(#7);",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"hello\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Run twice with <code>read(#7,1)</code>. The prepared input is consumed once; the second call returns <code>0</code>."
    ]
  },
  {
    "id": "builtin-server_version",
    "builtin": "server_version",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "server_version()",
    "verb": "#42:explore_server_version",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">server_version</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: server version.\";\nreturn server_version();",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · SERVER ADMINISTRATION: Operates on the saved educational host. shutdown records a request without stopping the app; logs and checkpoints stay in the world. server_version is a fixed educational version string. Only fg_ticks/fg_seconds server options are supported.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"moo-in-javascript/0.2.0 (educational)\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Run again: the educational version string stays the same. It does not identify a running native server."
    ]
  },
  {
    "id": "builtin-server_log",
    "builtin": "server_log",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "server_log()",
    "verb": "#42:explore_server_log",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">server_log</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: server log.\";\nreturn server_log(\"hello\");",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · SERVER ADMINISTRATION: Operates on the saved educational host. shutdown records a request without stopping the app; logs and checkpoints stay in the world. server_version is a fixed educational version string. Only fg_ticks/fg_seconds server options are supported.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the message. It is appended to this world’s host log, not to a system log."
    ]
  },
  {
    "id": "builtin-shutdown",
    "builtin": "shutdown",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "shutdown()",
    "verb": "#42:explore_shutdown",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">shutdown</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: shutdown.\";\nreturn shutdown(\"bye\");",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · SERVER ADMINISTRATION: Operates on the saved educational host. shutdown records a request without stopping the app; logs and checkpoints stay in the world. server_version is a fixed educational version string. Only fg_ticks/fg_seconds server options are supported.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the reason string. The app keeps running because this records an intent only."
    ]
  },
  {
    "id": "builtin-dump_database",
    "builtin": "dump_database",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "dump_database()",
    "verb": "#42:explore_dump_database",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">dump_database</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: dump database.\";\nreturn dump_database();",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · SERVER ADMINISTRATION: Operates on the saved educational host. shutdown records a request without stopping the app; logs and checkpoints stay in the world. server_version is a fixed educational version string. Only fg_ticks/fg_seconds server options are supported.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "After the call, return <code>db_disk_size()</code>. This measures the stored checkpoint, not physical disk usage."
    ]
  },
  {
    "id": "builtin-db_disk_size",
    "builtin": "db_disk_size",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "VIRTUAL CONNECTIONS",
    "title": "db_disk_size()",
    "verb": "#42:explore_db_disk_size",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">db_disk_size</code>.</p><p>The prepared lesson world supplies a virtual learner connection with one queued input line. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: db disk size.\";\nreturn db_disk_size();",
    "host": "connection",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · SERVER ADMINISTRATION: Operates on the saved educational host. shutdown records a request without stopping the app; logs and checkpoints stay in the world. server_version is a fixed educational version string. Only fg_ticks/fg_seconds server options are supported.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call <code>dump_database()</code> before measuring. A world without a checkpoint returns <code>0</code>."
    ]
  },
  {
    "id": "builtin-sqlite_open",
    "builtin": "sqlite_open",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_open()",
    "verb": "#42:explore_sqlite_open",
    "body": "<p>SQLite: open.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: open.\";\nreturn sqlite_open(\"new\");",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Open a different name and inspect <code>sqlite_handles()</code>. Capture the returned handle rather than assuming its number."
    ]
  },
  {
    "id": "builtin-sqlite_close",
    "builtin": "sqlite_close",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_close()",
    "verb": "#42:explore_sqlite_close",
    "body": "<p>SQLite: close.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: close.\";\nreturn sqlite_close(1);",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Return <code>sqlite_handles()</code> after closing. A named database’s data survives closing; a :memory: database does not."
    ]
  },
  {
    "id": "builtin-sqlite_handles",
    "builtin": "sqlite_handles",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_handles()",
    "verb": "#42:explore_sqlite_handles",
    "body": "<p>SQLite: handles.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: handles.\";\nreturn sqlite_handles();",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{1}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Open another database, then inspect all active handles."
    ]
  },
  {
    "id": "builtin-sqlite_info",
    "builtin": "sqlite_info",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_info()",
    "verb": "#42:explore_sqlite_info",
    "body": "<p>SQLite: info.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: info.\";\nreturn sqlite_info(1);",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "[\"locks\" -> 0, \"parse_objects\" -> 1, \"parse_types\" -> 1, \"path\" -> \"example\", \"sanitize_strings\" -> 0]",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Open a database with options <code>0</code> and inspect its parse flags."
    ]
  },
  {
    "id": "builtin-sqlite_query",
    "builtin": "sqlite_query",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_query()",
    "verb": "#42:explore_sqlite_query",
    "body": "<p>SQLite: query.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: query.\";\nreturn sqlite_query(1,\"SELECT 42\");",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{{42}}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change SELECT <code>42</code> to SELECT <code>6</code> * <code>7</code>, then SELECT <code>43</code>. Query results are lists of row lists."
    ]
  },
  {
    "id": "builtin-sqlite_execute",
    "builtin": "sqlite_execute",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_execute()",
    "verb": "#42:explore_sqlite_execute",
    "body": "<p>SQLite: execute.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: execute.\";\nreturn sqlite_execute(1,\"SELECT ?\",{42});",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{{42}}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the bound parameter <code>42</code> to <code>7</code>. The SQL text stays the same."
    ]
  },
  {
    "id": "builtin-sqlite_last_insert_row_id",
    "builtin": "sqlite_last_insert_row_id",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_last_insert_row_id()",
    "verb": "#42:explore_sqlite_last_insert_row_id",
    "body": "<p>SQLite: last insert row id.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: last insert row id.\";\nreturn sqlite_last_insert_row_id(1);",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Create a table with an INTEGER PRIMARY KEY, insert a row, then inspect its generated identity."
    ]
  },
  {
    "id": "builtin-sqlite_limit",
    "builtin": "sqlite_limit",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_limit()",
    "verb": "#42:explore_sqlite_limit",
    "body": "<p>SQLite: limit.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: limit.\";\nreturn sqlite_limit(1,\"LIMIT_SQL_LENGTH\",5000);",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · REAL SQLITE: Uses real SQLite with bounded single-table queries. No joins, transactions, triggers or extensions. Data persists in this world; the lesson checkpoint supplies open handle 1. Engine errors return strings; argument and quota errors raise diagnostics.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "10000",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Lower LIMIT_SQL_LENGTH to <code>5</code>, then attempt SELECT <code>42</code>. Reset the lesson world to restore the default cap."
    ]
  },
  {
    "id": "builtin-sqlite_interrupt",
    "builtin": "sqlite_interrupt",
    "profiles": [
      "toaststunt"
    ],
    "group": "BOUNDED SQLITE",
    "title": "sqlite_interrupt()",
    "verb": "#42:explore_sqlite_interrupt",
    "body": "<p>SQLite: interrupt.</p><p>The prepared lesson world supplies an empty named database on handle <code>1</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"SQLite: interrupt.\";\nreturn sqlite_interrupt(1);",
    "host": "sqlite",
    "expectedOutput": [],
    "exploration": true,
    "warning": "LIMITED · NO-OP: Validates a handle and returns 0 between synchronous queries. It cannot interrupt an active query; use Stop to terminate a worker.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Use a valid handle and then an invalid one. The valid call returns zero without scheduling or interrupting work."
    ]
  },
  {
    "id": "builtin-curl",
    "builtin": "curl",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "curl()",
    "verb": "#42:explore_curl",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">curl</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: curl.\";\nreturn curl(\"example\");",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "MOCKED · CONFIGURED RESPONSE: Matches the exact request against prepared fixtures. No real network, process, environment or dictionary access occurs. Missing fixtures raise E_INVARG. The lesson checkpoint supplies the request used below.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"hello\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"example\"</code> to <code>\"missing\"</code>. No fixture matches, so the runtime raises <code>E_INVARG</code> without making a request."
    ]
  },
  {
    "id": "builtin-exec",
    "builtin": "exec",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "exec()",
    "verb": "#42:explore_exec",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">exec</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: exec.\";\nreturn exec({\"example\"});",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "MOCKED · CONFIGURED RESPONSE: Matches the exact request against prepared fixtures. No real network, process, environment or dictionary access occurs. Missing fixtures raise E_INVARG. The lesson checkpoint supplies the request used below.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{0, \"hello\", \"\"}",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the command to <code>{\"missing\"}</code>. The runtime will not execute it; only the prepared exact fixture can succeed."
    ]
  },
  {
    "id": "builtin-getenv",
    "builtin": "getenv",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "getenv()",
    "verb": "#42:explore_getenv",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">getenv</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: getenv.\";\nreturn getenv(\"EXAMPLE\");",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "MOCKED · CONFIGURED RESPONSE: Matches the exact request against prepared fixtures. No real network, process, environment or dictionary access occurs. Missing fixtures raise E_INVARG. The lesson checkpoint supplies the request used below.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "\"value\"",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"EXAMPLE\"</code> to <code>\"HOME\"</code>. The host’s real HOME variable is never exposed; an absent fixture raises <code>E_INVARG</code>."
    ]
  },
  {
    "id": "builtin-spellcheck",
    "builtin": "spellcheck",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "spellcheck()",
    "verb": "#42:explore_spellcheck",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">spellcheck</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: spellcheck.\";\nreturn spellcheck(\"hello\");",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "MOCKED · CONFIGURED RESPONSE: Matches the exact request against prepared fixtures. No real network, process, environment or dictionary access occurs. Missing fixtures raise E_INVARG. The lesson checkpoint supplies the request used below.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "1",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change <code>\"hello\"</code> to <code>\"helo\"</code>. There is no dictionary; only the prepared request has a response."
    ]
  },
  {
    "id": "builtin-open_network_connection",
    "builtin": "open_network_connection",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "open_network_connection()",
    "verb": "#42:explore_open_network_connection",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">open_network_connection</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: open network connection.\";\nreturn open_network_connection(\"example\",80);",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "MOCKED · CONFIGURED RESPONSE: Matches the exact request against prepared fixtures. No real network, process, environment or dictionary access occurs. Missing fixtures raise E_INVARG. The lesson checkpoint supplies the request used below.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "#-2",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Capture the returned negative object reference and call read on it. Its input is the configured fixture, not a real socket."
    ]
  },
  {
    "id": "builtin-listen",
    "builtin": "listen",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "listen()",
    "verb": "#42:explore_listen",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">listen</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: listen.\";\nreturn listen(#7,8081);",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "8081",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change the port to <code>8082</code>, then inspect <code>listeners()</code>. No network port is opened."
    ]
  },
  {
    "id": "builtin-unlisten",
    "builtin": "unlisten",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "unlisten()",
    "verb": "#42:explore_unlisten",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">unlisten</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: unlisten.\";\nreturn unlisten(8080);",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "After removing port <code>8080</code>, inspect <code>listeners()</code>. Removing an unknown port raises <code>E_INVARG</code>."
    ]
  },
  {
    "id": "builtin-listeners",
    "builtin": "listeners",
    "profiles": [
      "toaststunt",
      "lambdamoo"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "listeners()",
    "verb": "#42:explore_listeners",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">listeners</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: listeners.\";\nreturn listeners();",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "{[\"interface\" -> \"virtual\", \"ipv6\" -> 0, \"object\" -> #7, \"port\" -> 8080, \"print-messages\" -> 0]}",
    "profileOverrides": {
      "lambdamoo": {
        "expected": "{{#7, 8080, 0}}",
        "map": "Expected result from running the starter code (prepared world): {{#7, 8080, 0}}"
      }
    },
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Call <code>listen(#7,8082)</code> before listing again. The prepared checkpoint initially registers <code>8080</code>."
    ]
  },
  {
    "id": "builtin-read_http",
    "builtin": "read_http",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "read_http()",
    "verb": "#42:explore_read_http",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">read_http</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: read http.\";\nreturn read_http(\"request\",#7);",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · CONNECTIONS: Virtual connections and listeners only: no live socket or player. Input/output queues persist in this world. Ages count operations, and blocking read with no input cannot suspend. The checkpoint supplies a learner connection and any required input.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "[\"method\" -> \"GET\", \"uri\" -> \"/\"]",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Inspect the request method and URI in the returned map. The queued message is consumed; reset the lesson world before replaying it."
    ]
  },
  {
    "id": "builtin-load_server_options",
    "builtin": "load_server_options",
    "profiles": [
      "toaststunt"
    ],
    "group": "EXTERNAL SERVICE FIXTURES",
    "title": "load_server_options()",
    "verb": "#42:explore_load_server_options",
    "body": "<p>Simulated host: <code class=\"builtin-name\" title=\"MOO builtin\">load_server_options</code>.</p><p>The prepared lesson world supplies exact service-response fixtures, a virtual learner connection and port <code>8080</code>. Running code uses your current state; Load lesson starting world restores these resources.</p>",
    "code": "\"Simulated host: load server options.\";\nreturn load_server_options();",
    "host": "services",
    "expectedOutput": [],
    "exploration": true,
    "warning": "SIMULATED · SERVER ADMINISTRATION: Operates on the saved educational host. shutdown records a request without stopping the app; logs and checkpoints stay in the world. server_version is a fixed educational version string. Only fg_ticks/fg_seconds server options are supported.",
    "hint": [
      "Reference explains the arguments and supported options.",
      "Restore Example only restores code. Load lesson starting world restores the prepared resources, after confirmation."
    ],
    "expected": "0",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Inspect the defaults with ticks_left and seconds_left in a later run. Only fg_ticks and fg_seconds are modeled; zero budgets can prevent subsequent code from running until reset."
    ]
  },
  {
    "id": "builtin-object_bytes",
    "builtin": "object_bytes",
    "group": "ACCOUNTING STUBS",
    "title": "object_bytes()",
    "verb": "#42:explore_object_bytes",
    "body": "<p>Object memory accounting is a fixed-zero stub.</p>",
    "code": "\"Object memory accounting is a fixed-zero stub.\";\nreturn object_bytes(this);",
    "expected": "0",
    "expectedOutput": [],
    "exploration": true,
    "warning": "STUB · FIXED ZERO: Always returns 0 here. This is not a memory measurement. object_bytes still checks that its object exists.",
    "hint": "A changed input will not change the fixed return value.",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Change this to player. Both existing objects return the same placeholder zero; an invalid object raises an error."
    ]
  },
  {
    "id": "builtin-value_bytes",
    "builtin": "value_bytes",
    "group": "ACCOUNTING STUBS",
    "title": "value_bytes()",
    "verb": "#42:explore_value_bytes",
    "body": "<p>Value memory accounting is a fixed-zero stub.</p>",
    "code": "\"Value memory accounting is a fixed-zero stub.\";\nreturn value_bytes({1,2,3});",
    "expected": "0",
    "expectedOutput": [],
    "exploration": true,
    "warning": "STUB · FIXED ZERO: Always returns 0 here. This is not a memory measurement. object_bytes still checks that its object exists.",
    "hint": "A changed input will not change the fixed return value.",
    "steps": [
      "Run the starter code.",
      "Inspect its output and returned value."
    ],
    "experiment": [
      "Start with the prepared lesson world and run the example once.",
      "Make the list much larger. The result remains zero because this is a stub, not accounting."
    ]
  }
];

builtinLessons.push({
  "id": "builtin-suspend",
  "builtin": "suspend",
  "profiles": [
    "toaststunt",
    "lambdamoo"
  ],
  "group": "EXECUTION, ERRORS AND TIME",
  "title": "suspend()",
  "verb": "#42:explore_suspend",
  "body": "<p><code class=\"builtin-name\" title=\"MOO builtin\">suspend</code> pauses this task, then continues with its locals and call stack intact. It returns <code>0</code> and replenishes the tick and time allowances.</p><p>Here an explicit nonnegative delay is required and is capped at five seconds per call. ToastStunt accepts fractional seconds; LambdaMOO accepts integers. <code>suspend(0)</code> yields without a requested delay. This is bounded asynchronous execution, not a full MOO task scheduler.</p>",
  "code": "\"Continue after a bounded pause.\";\nplayer:tell(\"Before pause\");\nsuspend(1);\nplayer:tell(\"After pause\");\nreturn 0;",
  "expected": "0",
  "expectedOutput": [
    "Before pause",
    "After pause"
  ],
  "exploration": true,
  "warning": "LIMITED: Five seconds per wait, at most 100 suspensions, and a 15-second total editor watchdog. Output and allocation limits remain cumulative. Stop discards this run. No indefinite suspend(), resume(), or task queue.",
  "steps": [
    "Run the example and observe <code>\"Before pause\"</code> immediately, then <code>\"After pause\"</code> after the delay."
  ],
  "experiment": [
    "Change <code>suspend(1)</code> to <code>suspend(10)</code>. The requested wait is clamped to five seconds. Try Stop while waiting: the run ends without committing its world changes."
  ],
  "hint": "Use <code>ticks_left()</code> before and after <code>suspend(0)</code> to inspect replenishment. This does not reset output or allocation accounting."
});
