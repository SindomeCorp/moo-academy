// Native observations bound to lesson source and fixture provenance. Re-record deliberately and review changes.
export const utilityResults = {
  "utility-list-range": {
    "value": "0",
    "output": [
      "RANGE from one: {1, 2, 3, 4}",
      "RANGE selected interval: {3, 4, 5, 6}",
      "MAKE repeated value: {\"brush\", \"brush\", \"brush\"}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "RANGE from one: {1, 2, 3, 4}",
        "RANGE selected interval: {3, 4, 5, 6}",
        "MAKE repeated value: {\"brush\", \"brush\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "79b9d512598abd80bff8168b6056a37f13869095d0e058cd0ab8779ef2b79860"
    }
  },
  "utility-list-combine": {
    "value": "0",
    "output": [
      "APPEND one level: {\"brush\", \"brush\", \"saw\", \"brush\", \"hammer\"}",
      "COMPRESS neighboring copies: {\"brush\", \"saw\", \"brush\"}",
      "REMOVE_DUPLICATES all copies: {\"brush\", \"saw\"}",
      "SETREMOVE_ALL brushes: {\"saw\"}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "APPEND one level: {\"brush\", \"brush\", \"saw\", \"saw\", \"hammer\"}",
        "COMPRESS neighboring copies: {\"brush\", \"saw\"}",
        "REMOVE_DUPLICATES all copies: {\"brush\", \"saw\"}",
        "SETREMOVE_ALL brushes: {\"saw\", \"saw\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8508d0f10bc66707b9ca10fd3aead34a9d38d0f0642c745f7c0fbf0513e4c8ef"
    }
  },
  "utility-list-flatten": {
    "value": "0",
    "output": [
      "FLATTEN items: {\"brush\", \"saw\", \"brush\"}",
      "COUNT brushes: 2",
      "LONGEST item: brush",
      "SHORTEST item: saw",
      "MAX_LENGTH minimum zero: 5"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "FLATTEN items: {\"brush\", \"saw\", \"brush\"}",
        "COUNT brushes: 2",
        "LONGEST item: brush",
        "SHORTEST item: saw",
        "MAX_LENGTH minimum zero: 10"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "afa709b80d016ac4b8d78e01a370356d2b1e982e605419dcad7a19cc3e21a427"
    }
  },
  "utility-list-positions": {
    "value": "0",
    "output": [
      "REVERSE: {\"hammer\", \"saw\", \"brush\"}",
      "SWAP first and last: {\"hammer\", \"saw\", \"brush\"}",
      "SETMOVE first to last: {\"saw\", \"hammer\", \"brush\"}",
      "ARRAYSET nested count: {{\"brush\", 7}}",
      "Original unchanged: {\"brush\", \"saw\", \"hammer\"}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "REVERSE: {\"hammer\", \"saw\", \"brush\"}",
        "SWAP first and last: {\"hammer\", \"saw\", \"brush\"}",
        "SETMOVE first to last: {\"saw\", \"hammer\", \"brush\"}",
        "ARRAYSET nested count: {{\"brush\", 9}}",
        "Original unchanged: {\"brush\", \"saw\", \"hammer\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "dc0a9cad0185e768a5ff7a9ebbb32a4d581550597c43d1187522085f4f3793ec"
    }
  },
  "utility-list-assoc": {
    "value": "0",
    "output": [
      "ASSOC matching record: {\"brush\", 3}",
      "IASSOC record position: 1",
      "ASSOC absent record: {}",
      "IASSOC_NEW malformed input: E_RANGE"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ASSOC matching record: {\"brush\", 3}",
        "IASSOC record position: 1",
        "ASSOC absent record: {\"hammer\", 2}",
        "IASSOC_NEW malformed input: E_RANGE"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "13d2c66f28aa5b473c0d8b7825bc4f1940c1dedf5ff746aab509b77f81f2ef70"
    }
  },
  "utility-list-search": {
    "value": "0",
    "output": [
      "ASSOC_PREFIX first match: {\"brush\", 3}",
      "IASSOC_PREFIX position: 1",
      "FIND_INSERT after equals: 4",
      "IASSOC_SORTED predecessor: 2"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ASSOC_PREFIX first match: {\"brush\", 3}",
        "IASSOC_PREFIX position: 1",
        "FIND_INSERT after equals: 5",
        "IASSOC_SORTED predecessor: 2"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "e1bb166f4c7475924f9c64d06eeea0c6a02b0dbc2e5db59edd3bf96122a63693"
    }
  },
  "utility-list-mapping": {
    "value": "0",
    "output": [
      "MAP_PROPERTY names: {\"String Utilities\", \"List Utilities\"}",
      "MAP_VERB titles: {\"String Utilities\", \"List Utilities\"}",
      "MAP_ARGS uppercase: {\"BRUSH\", \"SAW\"}",
      "MAP_BUILTIN lengths: {5, 3}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "MAP_PROPERTY names: {\"String Utilities\", \"List Utilities\"}",
        "MAP_VERB titles: {\"String Utilities\", \"List Utilities\"}",
        "MAP_ARGS uppercase: {\"brush\", \"saw\"}",
        "MAP_BUILTIN lengths: {5, 3}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "ce253a2329d01081845772b12c6326e8ef4e5e358861b18233d2ba1e72a4d856"
    }
  },
  "utility-list-random": {
    "value": "0",
    "output": [
      "RANDOM_ITEM choice: 1",
      "RANDOM_ELEMENT alias: 3",
      "RANDOMLY_PERMUTE: {1, 3, 2}",
      "RANDOMLY_PERMUTE_SUSPENDED: {1, 2, 3}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "RANDOM_ITEM choice: 3",
        "RANDOM_ELEMENT alias: 3",
        "RANDOMLY_PERMUTE: {1, 3, 2}",
        "RANDOMLY_PERMUTE_SUSPENDED: {3, 2, 1}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "a834c3bf6f20e2de0cdf1a27225bd712d05c0a7319572ac569f02d3ed90e0de4"
    }
  },
  "utility-list-inventory-report": {
    "value": "0",
    "output": [
      "Items: brush and saw",
      "Selected record: {\"brush\", 3}",
      "Name count: 2"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "Items: brush and saw",
        "Selected record: {\"brush\", 9}",
        "Name count: 2"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "2774887aac8de96af3f3c8a7769b920e603cd363b951c9bdb71d2e16767a2321"
    }
  },
  "utility-set-combine": {
    "value": "0",
    "output": [
      "UNION: {\"brush\", \"saw\", \"hammer\"}",
      "INTERSECTION: {\"saw\"}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "UNION: {\"brush\", \"saw\", \"hammer\"}",
        "INTERSECTION: {\"brush\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8dedd893a89c547e32029affba8ff1c51f09e7446d24f265f8b0c0828982fd9a"
    }
  },
  "utility-set-membership": {
    "value": "0",
    "output": [
      "CONTAINS a subset: 1",
      "CONTAINS missing member: 0",
      "CONTAINS empty set: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "CONTAINS a subset: 1",
        "CONTAINS missing member: 1",
        "CONTAINS empty set: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8610cb54934918149a30c99dea5719a3c336b2df47a6d589daee93c220b9ebad"
    }
  },
  "utility-set-difference": {
    "value": "0",
    "output": [
      "DIFFERENCE a minus b: {1}",
      "DIFF b minus a: {3}",
      "EXCLUSIVE_OR: {1, 3}",
      "XOR three inputs: {1, 3, 4}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DIFFERENCE a minus b: {1}",
        "DIFF b minus a: {3}",
        "EXCLUSIVE_OR: {1, 3}",
        "XOR three inputs: {3, 4}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "120617adc9301b992e1fb30ec6888870f557aef9cf17cc9122ae8cd3714bfc5a"
    }
  },
  "utility-set-equal": {
    "value": "0",
    "output": [
      "EQUAL membership: 1",
      "List equality: 0",
      "Preserved spelling: {\"BRUSH\"}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "EQUAL membership: 0",
        "List equality: 0",
        "Preserved spelling: {\"BRUSH\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "319b19595bac468d33a107b8e58d69b901d3061d643631f1cd21507ba28d89df"
    }
  },
  "utility-set-yielding": {
    "value": "0",
    "output": [
      "DIFFERENCE_SUSPENDED: {1, 3}",
      "DIFF_SUSPENDED alias: {1, 3}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DIFFERENCE_SUSPENDED: {2, 4}",
        "DIFF_SUSPENDED alias: {2, 4}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8ce396162eef85c34c748ecac59327269240ba6ee9d2e33551c59063c463097d"
    }
  },
  "utility-set-supply-report": {
    "value": "0",
    "output": [
      "Available: brush and saw",
      "Missing: hammer",
      "Complete supply set: 0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "Available: brush, saw, and hammer",
        "Missing: nothing",
        "Complete supply set: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "51a2e2ad50742aef3b0e6e2099d6a92f526e8293d91d863a880f452497317c82"
    }
  },
  "utility-list-sorting": {
    "value": "0",
    "output": [
      "sort source:",
      "\"sort(list[,keys]) => sorts keys (assumed to be all numbers or strings) and returns list with the corresponding permutation applied to it.  keys defaults to the list itself.\";",
      "\"sort({x1,x3,x2},{1,3,2}) => {x1,x2,x3}\";",
      "set_thread_mode(0);",
      "return sort(@args);",
      "slice source:",
      "\"slice(alist[,index]) returns a list of the index-th elements of the elements of alist, e.g., \";",
      "\"    slice({{\\\"z\\\",1},{\\\"y\\\",2},{\\\"x\\\",5}},2) => {1,2,5}.\";",
      "\"index defaults to 1 and may also be a nonempty list, e.g., \";",
      "\"    slice({{\\\"z\\\",1,3},{\\\"y\\\",2,4}},{2,1}) => {{1,\\\"z\\\"},{2,\\\"y\\\"}}\";",
      "\"For compatibility with LambdaCore, threading is disabled by default.\";",
      "set_thread_mode(0);",
      "sort_alist source:",
      "\":sort_alist(alist[,n]) sorts a list of tuples by n-th (1st) element.\";",
      "{alist, ?sort_on = 1} = args;",
      "if ((alist_length = length(alist)) < 25)",
      "\"use insertion sort on short lists\";",
      "return this:sort(alist, this:slice(@args));",
      "endif",
      "amerge source:",
      "\"Copied from Uther's_Ghost (#93141):amerge Tue May 27 20:28:18 1997 PDT\";",
      "\"amerge(list[,tindex[,dindex]]) returns an associated list such that all the tuples in the original list with the same tindex-th element are merged. Useful for merging alists ( amerge({@alist1, @alist2, ...}) ) and for ensuring that each tuple has a unique index. Tindex defaults to 1. Dindex defaults to 1 and refers to the position in the tuple where the tindex-th element will land in the new tuple.\";",
      "{alist, ?tidx = 1, ?didx = 1} = args;",
      "if (alist)",
      "alist = this:sort_alist(alist, tidx);",
      "i = 1;",
      "sort_alist_suspended source:",
      "\"sort_alist_suspended(interval,alist[,n]) sorts a list of tuples by n-th element.  n defaults to 1.  Calls suspend(interval) as necessary.\";",
      "set_task_perms(caller_perms());",
      "\"... so it can be killed...\";",
      "{interval, alist, ?sort_on = 1} = args;",
      "if ((alist_length = length(alist)) < 10)",
      "\"insertion sort on short lists\";"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "sort source:",
        "\"sort(list[,keys]) => sorts keys (assumed to be all numbers or strings) and returns list with the corresponding permutation applied to it.  keys defaults to the list itself.\";",
        "\"sort({x1,x3,x2},{1,3,2}) => {x1,x2,x3}\";",
        "set_thread_mode(0);",
        "return sort(@args);",
        "slice source:",
        "\"slice(alist[,index]) returns a list of the index-th elements of the elements of alist, e.g., \";",
        "\"    slice({{\\\"z\\\",1},{\\\"y\\\",2},{\\\"x\\\",5}},2) => {1,2,5}.\";",
        "\"index defaults to 1 and may also be a nonempty list, e.g., \";",
        "\"    slice({{\\\"z\\\",1,3},{\\\"y\\\",2,4}},{2,1}) => {{1,\\\"z\\\"},{2,\\\"y\\\"}}\";",
        "\"For compatibility with LambdaCore, threading is disabled by default.\";",
        "set_thread_mode(0);",
        "return slice(@args);",
        "sort_alist source:",
        "\":sort_alist(alist[,n]) sorts a list of tuples by n-th (1st) element.\";",
        "{alist, ?sort_on = 1} = args;",
        "if ((alist_length = length(alist)) < 25)",
        "\"use insertion sort on short lists\";",
        "return this:sort(alist, this:slice(@args));",
        "endif",
        "left_index = alist_length / 2;",
        "right_index = (alist_length + 1) / 2;",
        "left_sublist = this:sort_alist(alist[1..left_index], sort_on);",
        "right_sublist = this:sort_alist(alist[left_index + 1..alist_length], sort_on);",
        "\"...\";",
        "\"... merge ...\";",
        "amerge source:",
        "\"Copied from Uther's_Ghost (#93141):amerge Tue May 27 20:28:18 1997 PDT\";",
        "\"amerge(list[,tindex[,dindex]]) returns an associated list such that all the tuples in the original list with the same tindex-th element are merged. Useful for merging alists ( amerge({@alist1, @alist2, ...}) ) and for ensuring that each tuple has a unique index. Tindex defaults to 1. Dindex defaults to 1 and refers to the position in the tuple where the tindex-th element will land in the new tuple.\";",
        "{alist, ?tidx = 1, ?didx = 1} = args;",
        "if (alist)",
        "alist = this:sort_alist(alist, tidx);",
        "i = 1;",
        "res = {{cur = alist[1][tidx]}};",
        "for tuple in (alist)",
        "if (tuple[tidx] == cur)",
        "res[i] = {@res[i], @listdelete(tuple, tidx)};",
        "else",
        "if (didx != 1)",
        "sort_alist_suspended source:",
        "\"sort_alist_suspended(interval,alist[,n]) sorts a list of tuples by n-th element.  n defaults to 1.  Calls suspend(interval) as necessary.\";",
        "set_task_perms(caller_perms());",
        "\"... so it can be killed...\";",
        "{interval, alist, ?sort_on = 1} = args;",
        "if ((alist_length = length(alist)) < 10)",
        "\"insertion sort on short lists\";",
        "$command_utils:suspend_if_needed(interval);",
        "return this:sort(alist, this:slice(@listdelete(args, 1)));",
        "endif",
        "\"variables specially expanded for the anal-retentive\";",
        "left_index = alist_length / 2;",
        "right_index = (alist_length + 1) / 2;"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "SORT values: {1, 2, 3}",
        "SLICE counts: {2, 3, 4}",
        "SORT_ALIST by name: {{\"brush\", 3}, {\"brush\", 4}, {\"saw\", 2}}",
        "SORT_ALIST_SUSPENDED: {{\"brush\", 3}, {\"brush\", 4}, {\"saw\", 2}}",
        "AMERGE equal names: {{\"brush\", 3, 4}, {\"saw\", 2}}"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "SORT values: {1, 2, 3}",
        "SLICE counts: {\"saw\", \"brush\", \"brush\"}",
        "SORT_ALIST by name: {{\"brush\", 3}, {\"brush\", 4}, {\"saw\", 2}}",
        "SORT_ALIST_SUSPENDED: {{\"brush\", 3}, {\"brush\", 4}, {\"saw\", 2}}",
        "AMERGE equal names: {{\"brush\", 3, 4}, {\"saw\", 2}}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "d0e5617faf60f46a0f9859836a0fbae24db7bf3ce54645002a65b9d1326373c5"
    }
  },
  "utility-math-factorial": {
    "value": "0",
    "output": [
      "FACTORIAL: 120",
      "COMBINATIONS: 10",
      "PERMUTATIONS: 20"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "FACTORIAL: 120",
        "COMBINATIONS: 10",
        "PERMUTATIONS: 60"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "89873126da003d9a576e1bed6d15f2aed4a9b11dc684728257b8f28a7f97b4f0"
    }
  },
  "utility-math-divmod": {
    "value": "0",
    "output": [
      "DIVMOD quotient and remainder: {-3, 2}",
      "DIV quotient: -3",
      "MOD remainder: 2",
      "PARTS decimal digits: {2, 33}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DIVMOD quotient and remainder: {2, 1}",
        "DIV quotient: 2",
        "MOD remainder: 1",
        "PARTS decimal digits: {2, 33}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "0815ef1a50d8f0a050ccc0a8743ce4ca45a613e678d1a57d195a777e2963aa22"
    }
  },
  "utility-math-gcd": {
    "value": "0",
    "output": [
      "GCD: 6",
      "LCM: 36",
      "RELATIVELY PRIME: 0",
      "IS PRIME 17: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "GCD: 1",
        "LCM: 300",
        "RELATIVELY PRIME: 1",
        "IS PRIME 17: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "0a322fcff60b7576d213481f37c24d37e936f1276c439b0d63c43a64b38f4030"
    }
  },
  "utility-math-series": {
    "value": "0",
    "output": [
      "FIBONACCI: {0, 1, 1, 2, 3}",
      "GEOMETRIC at one half: 1.9375",
      "EXP integer approximation: {2, 70833}",
      "EXP float at zero: 1.0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "FIBONACCI: {0, 1, 1, 2, 3, 5}",
        "GEOMETRIC at one half: 1.96875",
        "EXP integer approximation: {2, 71666}",
        "EXP float at zero: 1.0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "a8c6513a52d34baa478821996e1ecd0ecef74431ecbd6357589ca91131b658a9"
    }
  },
  "utility-math-totals": {
    "value": "0",
    "output": [
      "SUM integers: 12",
      "MEAN integers: 4",
      "SUM floating: 4.0",
      "PERCENT complete: 75.0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "SUM integers: 15",
        "MEAN integers: 5",
        "SUM floating: 4.0",
        "PERCENT complete: 75.0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "03374da837ded0934adc7620a7cbb49fe9ad2b78012ebf1954270f2c97c0e226"
    }
  },
  "utility-math-rounding": {
    "value": "0",
    "output": [
      "RINT positive: 3.0",
      "RINT negative: -3.0",
      "PRECISION two places: 1.24",
      "ROUND to five: 15"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "RINT positive: 2.0",
        "RINT negative: -2.0",
        "PRECISION two places: 1.24",
        "ROUND to five: 15"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "561497630e8b67d7a68ff68764fe05c54cc33fbc5e838f9f01290fa92db28b5e"
    }
  },
  "utility-math-bases": {
    "value": "0",
    "output": [
      "BASE hexadecimal: \"A\"",
      "BITS least significant eight: {0, 0, 0, 0, 1, 0, 1, 0}",
      "BITS back to integer: 10",
      "NOT signed complement: -11"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "BASE hexadecimal: \"F\"",
        "BITS least significant eight: {0, 0, 0, 0, 1, 1, 1, 1}",
        "BITS back to integer: 15",
        "NOT signed complement: -16"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "e6d51ba11748fa1aa90445ffb1e03994800adf5f1a36effd512381667c73c666"
    }
  },
  "utility-math-angles": {
    "value": "0",
    "output": [
      "RADIANS: 0.0",
      "DEGREES round trip: 0.0",
      "SIN radians: 0.0",
      "COS radians: 1.0",
      "TAN radians: 0.0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "RADIANS: 0.0",
        "DEGREES round trip: 0.0",
        "SIN radians: 0.0",
        "COS radians: 1.0",
        "TAN radians: 0.0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "39ee39af3494bbf4ec3cb630cc5335ecb9e49da59b2894c40c4bd7e1ad6f59bb"
    }
  },
  "utility-math-inverse-trig": {
    "value": "0",
    "output": [
      "ARCSIN radians: 0.0",
      "ARCCOS radians: 0.0",
      "ARCTAN radians: 0.0",
      "NORM 3 4: 5"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ARCSIN radians: 0.0",
        "ARCCOS radians: 0.0",
        "ARCTAN radians: 0.0",
        "NORM 3 4: 10"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "f46546580626e9f0f23db762fd2f44baf09f23451ed81ec09f7032dd6543975f"
    }
  },
  "utility-math-integration": {
    "value": "0",
    "output": [
      "SIMPSON integer parts: {2, 66666}",
      "SIMPSON floating area: 2.66666666666667"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "SIMPSON integer parts: {5, 33333}",
        "SIMPSON floating area: 5.33333333333333"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "981ae7ddb0bc60556d8e6f62ede6ab8eb043f364273fa5378427e67c62a0cc34"
    }
  },
  "utility-math-random": {
    "value": "0",
    "output": [
      "RANDOM zero through two: 0",
      "RANDOM minus two through zero: -1",
      "RANDOM around ten: 8"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "RANDOM zero through two: 0",
        "RANDOM minus two through zero: 0",
        "RANDOM around ten: 11"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "c2c96ac0aae853fc62bb0774e6c270eeac2236e0a5c20cc15b926e12674f01b6"
    }
  },
  "utility-math-supply-budget": {
    "value": "0",
    "output": [
      "ITEMS ready: 9",
      "PERCENT unrounded: 75.0",
      "PERCENT displayed: 75.0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ITEMS ready: 9",
        "PERCENT unrounded: 50.0",
        "PERCENT displayed: 50.0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "ba36d716cce272309a2c26e9393cd39a91961938d72508b5c5eeabd16375addc"
    }
  },
  "utility-matrix-identity": {
    "value": "0",
    "output": [
      "IDENTITY: {{1, 0}, {0, 1}}",
      "NULL: {{0, 0}, {0, 0}}",
      "IS SQUARE: 1",
      "IS NULL: 1",
      "IS IDENTITY zero limitation: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "IDENTITY: {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}",
        "NULL: {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}",
        "IS SQUARE: 1",
        "IS NULL: 1",
        "IS IDENTITY zero limitation: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "4e4b75821e2a6920911d3e18d7a36c647a85cdb2ba852777f51f1a5cdba48316"
    }
  },
  "utility-matrix-shape": {
    "value": "0",
    "output": [
      "IS VECTOR first row: 1",
      "IS MATRIX: 1",
      "DIMENSIONS: {2, 2}",
      "ORDER: 2"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "IS VECTOR first row: 1",
        "IS MATRIX: 1",
        "DIMENSIONS: {2, 3}",
        "ORDER: 2"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8eecdc3c94c0c75b8d1be8492e78a34ba3fe784ac58f8de98a267245fa56d2bd"
    }
  },
  "utility-matrix-vectors": {
    "value": "0",
    "output": [
      "VECTOR add: {3, 6}",
      "VECTOR subtract: {1, 2}",
      "VECTOR multiply: {2, 8}",
      "VECTOR divide: {2, 2}",
      "SCALAR multiply: {6, 12}",
      "SCALAR add: {5, 7}",
      "SCALAR subtract: {1, 3}",
      "SCALAR divide: {1, 2}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "VECTOR add: {5, 10}",
        "VECTOR subtract: {3, 6}",
        "VECTOR multiply: {4, 16}",
        "VECTOR divide: {4, 4}",
        "SCALAR multiply: {12, 24}",
        "SCALAR add: {7, 11}",
        "SCALAR subtract: {3, 7}",
        "SCALAR divide: {2, 4}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "ca15ea8d484907c75ee4b911caffd35ad2d9d090284a9f27cfd7b5e347485222"
    }
  },
  "utility-matrix-transpose": {
    "value": "0",
    "output": [
      "TRANSPOSE: {{1, 3}, {2, 4}}",
      "COLUMN second: {2, 4}",
      "SUBMATRIX remove first row and column: {{4}}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "TRANSPOSE: {{1, 3}, {2, 9}}",
        "COLUMN second: {2, 9}",
        "SUBMATRIX remove first row and column: {{9}}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "2326ba421ff7811149b861b77891aee90a81065919f6b760c7695cdbf7768285"
    }
  },
  "utility-matrix-dot": {
    "value": "0",
    "output": [
      "DOT product: 25",
      "NORM a: 5.0",
      "ANGLE radians: 0.0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DOT product: 50",
        "NORM a: 5.0",
        "ANGLE radians: 0.0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "1f107200e3eb97beed7cc46c03a06cab439004f7d038a8cd8e8009e3e955d016"
    }
  },
  "utility-matrix-determinants": {
    "value": "0",
    "output": [
      "DETERMINANT: -2",
      "CROSS product: {0, 0, 1}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DETERMINANT: -2",
        "CROSS product: {0, 0, 2}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "74b4adb4072409b08ed18ed6b05b46d70ae1d935cf2cf8cf5c27fb7ebdfbccae"
    }
  },
  "utility-matrix-inverse": {
    "value": "0",
    "output": [
      "INVERSE: {{0.5, -0.0}, {-0.0, 0.25}}",
      "PRODUCT: {{1.0, 0.0}, {0.0, 1.0}}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "INVERSE: {{0.25, -0.0}, {-0.0, 0.25}}",
        "PRODUCT: {{1.0, 0.0}, {0.0, 1.0}}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "b1bb5ecaa80291c0bf0e5be6ff42f7d06c44130c50fdda99353e761e96feb564"
    }
  },
  "utility-matrix-matrix-arithmetic": {
    "value": "0",
    "output": [
      "matrix_add source:",
      "\":matrix_add(M1 [, M2 ...]) => MN such that MN[m][n] = M1[m][n] + M2[m][n]...\";",
      "\":matrix_sub(M1 [, M2 ...]) => MN such that MN[m][n] = M1[m][n] - M2[m][n]...\";",
      "\"Matrices should all be of the same size.\";",
      "\"\";",
      "\"Matrix addition and subtraction is simply the addition or subtraction of the vectors contained in the matrices. See 'help $matrix_utils:vector:add' for more help.\";",
      "type = verb[$ - 2..$];",
      "scalar_matrix_mul source:",
      "\":scalar_matrix_add(S, M) => MN such that MN[m][n] = MN[m][n] + S...\";",
      "\":scalar_matrix_sub(S, M) => MN such that MN[m][n] = MN[m][n] - S...\";",
      "\":scalar_matrix_mul(S, M) => MN such that MN[m][n] = MN[m][n] * S...\";",
      "\":scalar_matrix_div(S, M) => MN such that MN[m][n] = MN[m][n] / S...\";",
      "\"Actually, arguments can be (S, M) or (M, S). Each element of M is augmented by S. S should be either an INT or a FLOAT, as appropriate to the values in M.\";",
      "\"I can see a reason for wanting to do scalar/matrix multiplication or division, but addition and subtraction between matrix and scalar types is not done. I've included them here for novelty, and because it was easy enough to do.\";"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "matrix_add source:",
        "\":matrix_add(M1 [, M2 ...]) => MN such that MN[m][n] = M1[m][n] + M2[m][n]...\";",
        "\":matrix_sub(M1 [, M2 ...]) => MN such that MN[m][n] = M1[m][n] - M2[m][n]...\";",
        "\"Matrices should all be of the same size.\";",
        "\"\";",
        "\"Matrix addition and subtraction is simply the addition or subtraction of the vectors contained in the matrices. See 'help $matrix_utils:vector:add' for more help.\";",
        "type = verb[$ - 2..$];",
        "results = args[1];",
        "if (typeof(results[1][1]) == LIST)",
        "for n in [1..length(results)]",
        "results[n] = this:(verb)(results[n], @$list_utils:slice(args[2..$], n));",
        "endfor",
        "else",
        "scalar_matrix_mul source:",
        "\":scalar_matrix_add(S, M) => MN such that MN[m][n] = MN[m][n] + S...\";",
        "\":scalar_matrix_sub(S, M) => MN such that MN[m][n] = MN[m][n] - S...\";",
        "\":scalar_matrix_mul(S, M) => MN such that MN[m][n] = MN[m][n] * S...\";",
        "\":scalar_matrix_div(S, M) => MN such that MN[m][n] = MN[m][n] / S...\";",
        "\"Actually, arguments can be (S, M) or (M, S). Each element of M is augmented by S. S should be either an INT or a FLOAT, as appropriate to the values in M.\";",
        "\"I can see a reason for wanting to do scalar/matrix multiplication or division, but addition and subtraction between matrix and scalar types is not done. I've included them here for novelty, and because it was easy enough to do.\";",
        "type = verb[$ - 2..$];",
        "if (typeof(args[1]) == LIST)",
        "{mval, sval} = args;",
        "else",
        "{sval, mval} = args;",
        "endif"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "MATRIX add: {{3, 5}, {7, 9}}",
        "MATRIX subtract: {{1, 3}, {5, 7}}",
        "SCALAR MATRIX multiply: {{4, 8}, {12, 16}}",
        "SCALAR MATRIX divide: {{1, 2}, {3, 4}}"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "MATRIX add: {{4, 6}, {8, 10}}",
        "MATRIX subtract: {{0, 2}, {4, 6}}",
        "SCALAR MATRIX multiply: {{4, 8}, {12, 16}}",
        "SCALAR MATRIX divide: {{1, 2}, {3, 4}}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "9a709ef07ea044d9f750ce767e693460188fff569c056ce2a036c4d874dd5e4b"
    }
  },
  "utility-matrix-relations": {
    "value": "0",
    "output": [
      "REFLEXIVE native behavior: 0",
      "AREFLEXIVE native behavior: 1",
      "SYMMETRIC native behavior: 0",
      "ASYMMETRIC native behavior: 1",
      "TRANSITIVE native behavior: 0",
      "ATRANSITIVE native behavior: 1",
      "PARTIAL ORDERING native behavior: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "REFLEXIVE native behavior: 0",
        "AREFLEXIVE native behavior: -1",
        "SYMMETRIC native behavior: 0",
        "ASYMMETRIC native behavior: 1",
        "TRANSITIVE native behavior: 0",
        "ATRANSITIVE native behavior: 0",
        "PARTIAL ORDERING native behavior: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "5abb783040b20df9d63b1d0c273adb40826781882492061fb75a352627d0c79b"
    }
  },
  "utility-matrix-movement-report": {
    "value": "0",
    "output": [
      "START position: {2, 1}",
      "END position: {5, 5}",
      "DISTANCE traveled: 5.0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "START position: {2, 1}",
        "END position: {8, 9}",
        "DISTANCE traveled: 10.0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "7ccb74239d4ca3e33dfa4a0f16ed08b69362e9b526f30dbe60b5f8f8ba98f36d"
    }
  },
  "utility-match-possessive": {
    "value": "0",
    "output": [
      "MY reference: {\"me\", \"brush\"}",
      "NAMED reference: {\"Alex\", \"saw\"}",
      "NO possessive: 0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "MY reference: {\"me\", \"hammer\"}",
        "NAMED reference: {\"Alex\", \"saw\"}",
        "NO possessive: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "dd3c1cce6a5657d52bd88867e87e9e2b6248a39073c530ad2570851675fc8490"
    }
  },
  "utility-match-command-dispatch": {
    "value": "0",
    "output": [
      "COMMAND match programmatic verb: 0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "COMMAND match programmatic verb: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "6d5038310cbe8bea8f9951cd24655edf725e345c0e0bed669572981bc63f9099"
    }
  },
  "utility-object-definition": {
    "value": "0",
    "output": [
      "HAS VERB: {#55}",
      "CALLABLE: {#55}",
      "MATCH VERB: {#55, \"range\"}",
      "DEFINES VERB: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "HAS VERB: {#55}",
        "CALLABLE: {#55}",
        "MATCH VERB: {#55, \"make\"}",
        "DEFINES VERB: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "61002fe82c14d11bbaf52c26b4709c9b0801a3bf6162444ac2558dd780a6e6d0"
    }
  },
  "utility-object-containment": {
    "value": "0",
    "output": [
      "CONTAINS itself: 0",
      "ALL CONTENTS: {}",
      "LOCATIONS: {}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "CONTAINS itself: 0",
        "ALL CONTENTS: {}",
        "LOCATIONS: {}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "1782d17446af80e957cfcb0e9527c7e38d32437c5840a84beadf7f753d44ffe4"
    }
  },
  "utility-object-connections": {
    "value": "0",
    "output": [
      "UTILITY connected: 0",
      "ROOM connected: 0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "UTILITY connected: 0",
        "ROOM connected: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "e19b936c5365344c4ad0649495b04d97b399c7512bfcc8c5ca9d888e39c8549f"
    }
  },
  "utility-object-disinherit": {
    "value": "0",
    "output": [
      "DISOWN owned object guard: E_INVARG"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DISOWN owned object guard: E_INVARG"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "a9680b8a640c5f8453bf06c95b48e713b4b14741068649a55f1965ff948aaf3b"
    }
  },
  "utility-object-inspection-report": {
    "value": "0",
    "output": [
      "OBJECT name: \"List Utilities\"",
      "ANCESTOR count: 2",
      "RANGE callable: {#55}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "OBJECT name: \"Set Utilities\"",
        "ANCESTOR count: 2",
        "RANGE callable: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "7a29759c5369d1500853ab304e2e6c61eb58ced6f7c209267a6c41e5d7e8d07a"
    }
  },
  "utility-time-duration": {
    "value": "0",
    "output": [
      "DHMS: \"1:01:01\"",
      "ENGLISH: \"1 hour, 1 minute, and 1 second\"",
      "PARSED seconds: 3660"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DHMS: \"1:01\"",
        "ENGLISH: \"1 minute and 1 second\"",
        "PARSED seconds: 3660"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "1d41ce6eed4abb6d1f68d77077f0d9d5d5a44e7796f5d543d05a764c2c0b8c9f"
    }
  },
  "utility-time-seconds": {
    "value": "0",
    "output": [
      "CLOCK seconds: 3723",
      "EPOCH instant: 0",
      "INVALID date: E_DIV"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "CLOCK seconds: 7323",
        "EPOCH instant: 0",
        "INVALID date: E_DIV"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "7d105365ee8f74d59568b25ebc67b6c63db8be8c78ad5a55b73f383932db7d45"
    }
  },
  "utility-time-weekday": {
    "value": "0",
    "output": [
      "DAY: \"Tuesday\"",
      "MONTH: \"March\"",
      "AMPM minutes: \"1:04 p.m.\"",
      "AMPM seconds: \"1:04:09 p.m.\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "DAY: \"Tuesday\"",
        "MONTH: \"March\"",
        "AMPM minutes: \"12:04 a.m.\"",
        "AMPM seconds: \"12:04:09 a.m.\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "0f7fa1ce572883221327f02e1781127b706e58dfbeb3fec6d3718c28951b187d"
    }
  },
  "utility-time-date-order": {
    "value": "0",
    "output": [
      "MMDDYY: \"03/05/24\"",
      "DDMMYY: \"05/03/24\"",
      "MMDDYYYY: \"03-05-2024\"",
      "DDMMYYYY: \"05-03-2024\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "MMDDYY: \"03/05/25\"",
        "DDMMYY: \"05/03/25\"",
        "MMDDYYYY: \"03-05-2025\"",
        "DDMMYYYY: \"05-03-2025\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "7ecce2253566a8c0a321e7c469f954fb3415a24e46ff776e6ceace82ce0e307b"
    }
  },
  "utility-time-templates": {
    "value": "0",
    "output": [
      "TEMPLATE year: \"Year 1970\"",
      "RFC822 date: \"Thu, 1 Jan 1970 00:00:00 UTC\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "TEMPLATE year: \"Year 1970\"",
        "RFC822 date: \"Fri, 2 Jan 1970 00:00:00 UTC\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "0bfb2bf3ba591f27cedb1c11e66e710a490ffe2f4f8820427fb500e7597fb22b"
    }
  },
  "utility-time-calendar": {
    "value": "0",
    "output": [
      "FROM DAY next Monday: 1704096000",
      "FROM MONTH next January: 1798790400",
      "DST MIDNIGHT: 1704067200",
      "UNTIL DATE: 9165665",
      "UNTIL TIME noon: -17935"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "FROM DAY next Monday: 1704096000",
        "FROM MONTH next January: 1798790400",
        "DST MIDNIGHT: 1704067200",
        "UNTIL DATE: 9169265",
        "UNTIL TIME noon: -14335"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "4756b67ca27bb892f5e176f433314360b7d80bf151f9e19eaf0f5a9bfd2c508e"
    }
  },
  "utility-time-timer-report": {
    "value": "0",
    "output": [
      "REQUEST: \"2 minutes and 30 seconds\"",
      "SECONDS: 150",
      "DISPLAY: \"2:30\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "REQUEST: \"3 minutes and 30 seconds\"",
        "SECONDS: 210",
        "DISPLAY: \"3:30\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "30c35a87c57dc753ac71f0f21abf3bca88f8f7e91a0045cefee27fe0bbd5d919"
    }
  },
  "utility-match-candidates": {
    "value": "0",
    "output": [
      "ALL matches: {#55}",
      "NTH matching object: #20",
      "MATCH me: #127",
      "MATCH literal: #55"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ALL matches: {#55}",
        "NTH matching object: #20",
        "MATCH me: #127",
        "MATCH literal: #27"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "fd2d751968a7678d478222269f379c0ce5fcc0af6167dcbc5d861ba7fa76b9ea"
    }
  },
  "utility-match-feedback": {
    "value": "0",
    "output": [
      "There is no \"brush\" that you can see.",
      "FAILURE flag: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "You must give the name of some object.",
        "FAILURE flag: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "004fca2404e2598dab1f94447afaf4d0bcff0f09d1211ed21ea84923da99c8e6"
    }
  },
  "utility-wiz-identity": {
    "value": "0",
    "output": [
      "RAW wizard flag: 0",
      "WIZARD identity: 0",
      "NEWT permission guard: E_PERM"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "RAW wizard flag: 0",
        "WIZARD identity: 0",
        "NEWT permission guard: E_PERM"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "956d9ff4024c9a9e1231beb13d21755254cb6725b5fa8dbf76f4f1c8fb952e45"
    }
  },
  "utility-wiz-advertised": {
    "value": "0",
    "output": [
      "ADVERTISED: {#2}",
      "ALL alias: {#2}",
      "INCLUDING unadvertised: {#2}",
      "CONNECTED advertised: {}",
      "CONNECTED including unadvertised: {}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ADVERTISED: {#2}",
        "ALL alias: {#2}",
        "INCLUDING unadvertised: {#2}",
        "CONNECTED advertised: {}",
        "CONNECTED including unadvertised: {}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "02f06bc2172709bcda8dbd8689ad479151dd6fed9a427fdac35e35c4b4b44351"
    }
  },
  "utility-wiz-permission": {
    "value": "0",
    "output": [
      "SET PROGRAMMER guard: E_PERM",
      "SET PLAYER guard: E_PERM",
      "UNSET PROGRAMMER guard: E_PERM",
      "UNSET PLAYER guard: E_PERM"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "SET PROGRAMMER guard: E_PERM",
        "SET PLAYER guard: E_PERM",
        "UNSET PROGRAMMER guard: E_PERM",
        "UNSET PLAYER guard: E_PERM"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "fa8614109acc14ff70375fb12c414ba143f59859189ee4ee31d498f7009cb75a"
    }
  },
  "utility-wiz-ownership": {
    "value": "0",
    "output": [
      "set_owner source:",
      "\":set_owner(object,newowner[,suspendok])  does object.owner=newowner, taking care of c properties as well.  This should be used anyplace one is contemplating doing object.owner=newowner, since the latter leaves ownership of c properties unchanged.  (--Rog thinks this is a server bug). If force is specified and the object is already owned by newowner, c property ownership will proceed.\";",
      "{object, newowner, ?suspendok = 0, ?force = 0} = args;",
      "if (!valid(object))",
      "return E_INVIND;",
      "elseif (!caller_perms().wizard)",
      "return E_PERM;",
      "set_property_owner source:",
      "\":set_property_owner(object,prop,newowner[,suspendok])  changes the ownership of object.prop to newowner.  If the property is !c, changes the ownership on all of the descendents as well.  Otherwise, we just chown the property on the object itself and give a warning if newowner!=object.owner (--Rog thinks this is a server bug that one is able to do this at all...).\";",
      "{object, pname, newowner, ?suspendok = 0} = args;",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "elseif (!(info = `property_info(object, pname) ! ANY'))",
      "\"... handles E_PROPNF and invalid object errors...\";",
      "grant_object source:",
      "\":grant_object(what, towhom);\";",
      "\"Ownership of the object changes as in @chown and :set_owner (i.e., .owner and all c properties change).  In addition all verbs and !c properties owned by the original owner change ownership as well.  Finally, for !c properties, instances on descendant objects change ownership (as in :set_property_owner).\";",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "{object, newowner} = args;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "set_owner source:",
        "\":set_owner(object,newowner[,suspendok])  does object.owner=newowner, taking care of c properties as well.  This should be used anyplace one is contemplating doing object.owner=newowner, since the latter leaves ownership of c properties unchanged.  (--Rog thinks this is a server bug). If force is specified and the object is already owned by newowner, c property ownership will proceed.\";",
        "{object, newowner, ?suspendok = 0, ?force = 0} = args;",
        "if (!valid(object))",
        "return E_INVIND;",
        "elseif (!caller_perms().wizard)",
        "return E_PERM;",
        "elseif (!(valid(newowner) && is_player(newowner)))",
        "return E_INVARG;",
        "elseif ((object.owner == newowner) && (!force))",
        "return 1;",
        "endif",
        "oldowner = object.owner;",
        "set_property_owner source:",
        "\":set_property_owner(object,prop,newowner[,suspendok])  changes the ownership of object.prop to newowner.  If the property is !c, changes the ownership on all of the descendents as well.  Otherwise, we just chown the property on the object itself and give a warning if newowner!=object.owner (--Rog thinks this is a server bug that one is able to do this at all...).\";",
        "{object, pname, newowner, ?suspendok = 0} = args;",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "elseif (!(info = `property_info(object, pname) ! ANY'))",
        "\"... handles E_PROPNF and invalid object errors...\";",
        "return info;",
        "elseif (!is_player(newowner))",
        "return E_INVARG;",
        "elseif (index(info[2], \"c\"))",
        "if (suspendok / 2)",
        "\"...(recursive call)...\";",
        "grant_object source:",
        "\":grant_object(what, towhom);\";",
        "\"Ownership of the object changes as in @chown and :set_owner (i.e., .owner and all c properties change).  In addition all verbs and !c properties owned by the original owner change ownership as well.  Finally, for !c properties, instances on descendant objects change ownership (as in :set_property_owner).\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "{object, newowner} = args;",
        "if (!is_player(newowner))",
        "return E_INVARG;",
        "endif",
        "same = object.owner == newowner;",
        "for vnum in [1..length(verbs(object))]",
        "info = verb_info(object, vnum);"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "4737e2fad33b0eab10ff8a8770668c3241a9bcdda939107b9d9156a04911cdf9"
    }
  },
  "utility-wiz-property-flags": {
    "value": "0",
    "output": [
      "FLAGS before: \"rc\"",
      "SET flags: 1",
      "FLAGS after: \"r\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "FLAGS before: \"rc\"",
        "SET flags: 1",
        "FLAGS after: \"rw\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "a10b4ec03b377ad3bf1cda7fa0e2c65b2b5a71f43bbd9898b6a4075da4ed5737"
    }
  },
  "utility-wiz-email": {
    "value": "0",
    "output": [
      "EMAIL before: \"old@example.invalid\"",
      "EMAIL after: \"new@example.invalid\"",
      "FULL field: {\"new@example.invalid\", \"note\"}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "EMAIL before: \"old@example.invalid\"",
        "EMAIL after: \"other@example.invalid\"",
        "FULL field: {\"other@example.invalid\", \"note\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "1cb0ef6eadf40fef554556e3926cb0e613eef5f1f674a4460a72b99084aa7178"
    }
  },
  "utility-wiz-passwords": {
    "value": "0",
    "output": [
      "random_password source:",
      "\"Generate a random password of length args[1].  Alternates vowels and consonants, for maximum pronounceability.  Uses its own list of consonants which exclude F and C and K to prevent generating obscene sounding passwords.\";",
      "\"Capital I and lowercase L are excluded on the basis of looking like each other.\";",
      "vowels = \"aeiouyAEUY\";",
      "consonants = \"bdghjmnpqrstvwxzBDGHJLMNPQRSTVWXZ\";",
      "len = toint(args[1]);",
      "if (len)",
      "connection_hash source:",
      "\"connection_hash(forwhom, host [,seed])\";",
      "\"Compute an encrypted hash of the host for 'forwhom', using 'crypt'.\";",
      "{forwhom, host, @seed} = args;",
      "hash = toint(forwhom);",
      "for i in [1..length(host)]",
      "hash = (hash * 14) + index($string_utils.ascii, host[i]);"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "random_password source:",
        "\"Generate a random password of length args[1].  Alternates vowels and consonants, for maximum pronounceability.  Uses its own list of consonants which exclude F and C and K to prevent generating obscene sounding passwords.\";",
        "\"Capital I and lowercase L are excluded on the basis of looking like each other.\";",
        "vowels = \"aeiouyAEUY\";",
        "consonants = \"bdghjmnpqrstvwxzBDGHJLMNPQRSTVWXZ\";",
        "len = toint(args[1]);",
        "if (len)",
        "alt = random(2) - 1;",
        "s = \"\";",
        "for i in [1..len]",
        "newchar = alt ? vowels[random($)] | consonants[random($)];",
        "s = s + newchar;",
        "alt = !alt;",
        "connection_hash source:",
        "\"connection_hash(forwhom, host [,seed])\";",
        "\"Compute an encrypted hash of the host for 'forwhom', using 'crypt'.\";",
        "{forwhom, host, @seed} = args;",
        "hash = toint(forwhom);",
        "for i in [1..length(host)]",
        "hash = (hash * 14) + index($string_utils.ascii, host[i]);",
        "endfor",
        "return crypt(tostr(hash), @seed);"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "GENERATED length: 8",
        "ZERO length result: E_INVARG",
        "CONNECTION hash: \"ab4X5l23Wb5MQ\""
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "GENERATED length: 10",
        "ZERO length result: E_INVARG",
        "CONNECTION hash: \"ab4X5l23Wb5MQ\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "585b2b852a02dd4434e012c0a06c987e158071689949210436e72d6702c6c283"
    }
  },
  "utility-wiz-queues": {
    "value": "0",
    "output": [
      "queued_tasks source:",
      "\":queued_tasks(player) => list of queued tasks for that player.\";",
      "\"shouldn't the server builtin should work this way?  oh well\";",
      "set_task_perms(caller_perms());",
      "if (typeof(e = `set_task_perms(who = args[1]) ! ANY') == ERR)",
      "return e;",
      "elseif (who.wizard)",
      "random_wizard source:",
      "\"Put all your wizards in $wiz_utils.wizards.  Then various long-running tasks will cycle among the permissions, spreading out the scheduler-induced personal lag.\";",
      "w = this.wizards;",
      "i = this.next_perm_index;",
      "if (i >= length(w))",
      "i = 1;",
      "else"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "queued_tasks source:",
        "\":queued_tasks(player) => list of queued tasks for that player.\";",
        "\"shouldn't the server builtin should work this way?  oh well\";",
        "set_task_perms(caller_perms());",
        "if (typeof(e = `set_task_perms(who = args[1]) ! ANY') == ERR)",
        "return e;",
        "elseif (who.wizard)",
        "tasks = {};",
        "for t in (queued_tasks())",
        "if (t[5] == who)",
        "tasks = {@tasks, t};",
        "endif",
        "endfor",
        "random_wizard source:",
        "\"Put all your wizards in $wiz_utils.wizards.  Then various long-running tasks will cycle among the permissions, spreading out the scheduler-induced personal lag.\";",
        "w = this.wizards;",
        "i = this.next_perm_index;",
        "if (i >= length(w))",
        "i = 1;",
        "else",
        "i = i + 1;",
        "endif",
        "this.next_perm_index = i;",
        "return w[i];"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "OWN queue: {}",
        "NEXT permission owner: #2",
        "NEXT permission owner again: #2"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "OWN queue: E_PERM",
        "NEXT permission owner: #2",
        "NEXT permission owner again: #2"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "b378e879e4d6dcf42df4efe2159d23f2f72d0119208d124dbb1aa59ebc9c5dac"
    }
  },
  "utility-wiz-registry": {
    "value": "0",
    "output": [
      "check_player_request source:",
      "\":check_player_request(name [,email [,connection]])\";",
      "\" check if the request for player and email address is valid;\";",
      "\" return empty string if it valid, or else a string saying why not.\";",
      "\" The result starts with - if this is a 'send email, don't try again' situation.\";",
      "\":check_reregistration(who, email, connection)\";",
      "\"  Since name is ignored, only check the 'email' parts and use the first arg\";",
      "make_player source:",
      "\"create a player named NAME with email address ADDRESS; return {object, password}.  Optional third arg is comment to be put in registration db.\";",
      "\"assumes $wiz_utils:check_player_request() has been called and it passes.\";",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "{name, address, @rest} = args;",
      "do_make_player source:",
      "\"do_maker_player(name,email,[comment])\";",
      "\"Common code for @make-player\";",
      "\"If no password is given, generates a random password for the player.\";",
      "\"Email-address is stored in $registration_db and on the player object.\";",
      "if (!caller_perms().wizard)",
      "return E_PERM;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "check_player_request source:",
        "\":check_player_request(name [,email [,connection]])\";",
        "\" check if the request for player and email address is valid;\";",
        "\" return empty string if it valid, or else a string saying why not.\";",
        "\" The result starts with - if this is a 'send email, don't try again' situation.\";",
        "\":check_reregistration(who, email, connection)\";",
        "\"  Since name is ignored, only check the 'email' parts and use the first arg\";",
        "\"  for the re-registering player.\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "\"accesses registration information -- wiz only\";",
        "endif",
        "name = args[1];",
        "make_player source:",
        "\"create a player named NAME with email address ADDRESS; return {object, password}.  Optional third arg is comment to be put in registration db.\";",
        "\"assumes $wiz_utils:check_player_request() has been called and it passes.\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "{name, address, @rest} = args;",
        "new = $quota_utils:bi_create($player_class, $nothing);",
        "new.name = name;",
        "new.aliases = {name};",
        "new.password = $login:encrypt_password(password = $wiz_utils:random_password(5));",
        "new.last_password_time = time();",
        "new.last_connect_time = $maxint;",
        "do_make_player source:",
        "\"do_maker_player(name,email,[comment])\";",
        "\"Common code for @make-player\";",
        "\"If no password is given, generates a random password for the player.\";",
        "\"Email-address is stored in $registration_db and on the player object.\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "{name, email, @comments} = args;",
        "comments = $string_utils:from_list(comments, \" \");",
        "reason = $wiz_utils:check_player_request(name, email);",
        "if (others = $registration_db:find_exact(email))",
        "player:notify(email + \" is the registered address of the following characters:\");"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "ae674066bab3cc6d479a9112d6cf7b5017c7693912732642adf91de89e65ad2d"
    }
  },
  "utility-wiz-registration-changes": {
    "value": "0",
    "output": [
      "do_register source:",
      "\"do_register(name, email_address [,comments])\";",
      "\"change player's email address.\";",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "{whostr, email, @comments} = args;",
      "do_new_password source:",
      "\"do_new_password(who, [password])\";",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "{who, ?password = $wiz_utils:random_password(6)} = args;",
      "if (!password)",
      "send_new_player_mail source:",
      "\":send_new_player_mail(preface, name, address, character#, password)\";",
      "\"  used by $wiz:@make-player and $guest:@request\";",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "{preface, name, address, new, password} = args;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "do_register source:",
        "\"do_register(name, email_address [,comments])\";",
        "\"change player's email address.\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "{whostr, email, @comments} = args;",
        "comments = $string_utils:from_list(comments);",
        "who = $string_utils:match_player(whostr);",
        "if ($command_utils:player_match_failed(who, whostr))",
        "return;",
        "endif",
        "if (((whostr != who.name) && (!(whostr in who.aliases))) && (whostr != tostr(who)))",
        "do_new_password source:",
        "\"do_new_password(who, [password])\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "{who, ?password = $wiz_utils:random_password(6)} = args;",
        "if (!password)",
        "password = $wiz_utils:random_password(6);",
        "endif",
        "whostr = $string_utils:nn(who);",
        "player:notify(tostr(\"About to change password for \", whostr, \". Old encrypted password is \\\"\", who.password, \"\\\"\"));",
        "who.password = $login:encrypt_password(password);",
        "who.last_password_time = time();",
        "send_new_player_mail source:",
        "\":send_new_player_mail(preface, name, address, character#, password)\";",
        "\"  used by $wiz:@make-player and $guest:@request\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "{preface, name, address, new, password} = args;",
        "msg = {preface};",
        "msg = {@msg, tostr(\"A character has been created, with name \\\"\", name, \"\\\" and password \\\"\", password, \"\\\".\"), \"Passwords are case sensitive, which means you have to type it exactly as\", \"it appears here, including capital and lowercase letters.\", \"So, to log in, you would type:\", tostr(\"  Connect \", name, \" \", password)};",
        "if ($object_utils:has_property($local, \"new_player_message\"))",
        "msg = {@msg, @$local.new_player_message};",
        "endif",
        "return $network:sendmail(address, ((\"Your \" + $network.moo_name) + \" character, \") + name, \"Reply-to: \" + $login.registration_address, @msg);"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "9d030fd94814123cb59113d1495495ed2710fa4aa882b17a4037e879cb9c4e76"
    }
  },
  "utility-wiz-restrictions": {
    "value": "0",
    "output": [
      "check_prog_restricted source:",
      "\"Checks to see if args[1] is restricted from programmer either permanently or temporarily. Removes from temporary list if time is up\";",
      "if ((caller != this) && (!$perm_utils:controls(caller_perms(), this)))",
      "return E_PERM;",
      "endif",
      "if ((who = args[1]) in this.programmer_restricted)",
      "\"okay, who is restricted. Now check to see if it is temporary\";",
      "newt_player source:",
      "\":newt_player(who [ , commentary] [, temporary])\";",
      "{who, ?comment = \"\", ?temporary = 0} = args;",
      "if (!caller_perms().wizard)",
      "$error:raise(E_PERM);",
      "elseif (length(args) < 1)",
      "$error:raise(E_ARGS);"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "check_prog_restricted source:",
        "\"Checks to see if args[1] is restricted from programmer either permanently or temporarily. Removes from temporary list if time is up\";",
        "if ((caller != this) && (!$perm_utils:controls(caller_perms(), this)))",
        "return E_PERM;",
        "endif",
        "if ((who = args[1]) in this.programmer_restricted)",
        "\"okay, who is restricted. Now check to see if it is temporary\";",
        "if (entry = $list_utils:assoc(who, this.programmer_restricted_temp))",
        "if ($login:uptime_since(entry[2]) > entry[3])",
        "\"It's temporary and the time is up, remove and return false\";",
        "this.programmer_restricted_temp = setremove(this.programmer_restricted_temp, entry);",
        "this.programmer_restricted = setremove(this.programmer_restricted, who);",
        "return 0;",
        "newt_player source:",
        "\":newt_player(who [ , commentary] [, temporary])\";",
        "{who, ?comment = \"\", ?temporary = 0} = args;",
        "if (!caller_perms().wizard)",
        "$error:raise(E_PERM);",
        "elseif (length(args) < 1)",
        "$error:raise(E_ARGS);",
        "elseif ((typeof(who = args[1]) != OBJ) || (!is_player(who)))",
        "$error:raise(E_INVARG);",
        "else",
        "if (!comment)",
        "player:notify(\"So why has this player been newted?\");",
        "comment = $command_utils:read();"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "781ffca1a2a40d1c8fb9db6cb1f31ff9100f86eb7a5f18edf62335e1b12c7555"
    }
  },
  "utility-wiz-owned-index": {
    "value": "0",
    "output": [
      "initialize_owned source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "else",
      "set_task_perms(caller_perms());",
      "player:tell(\"Beginning initialize_owned:  \", ctime());",
      "for o in [#0..max_object()]",
      "verify_owned_objects source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "else",
      "for p in (players())",
      "if (typeof(p.owned_objects) == LIST)",
      "for o in (p.owned_objects)"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "initialize_owned source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "else",
        "set_task_perms(caller_perms());",
        "player:tell(\"Beginning initialize_owned:  \", ctime());",
        "for o in [#0..max_object()]",
        "if (valid(o))",
        "if ($object_utils:isa(owner = o.owner, $player) && (typeof(owner.owned_objects) == LIST))",
        "owner.owned_objects = setadd(owner.owned_objects, o);",
        "endif",
        "endif",
        "$command_utils:suspend_if_needed(0);",
        "verify_owned_objects source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "else",
        "for p in (players())",
        "if (typeof(p.owned_objects) == LIST)",
        "for o in (p.owned_objects)",
        "if (((typeof(o) != OBJ) || (!valid(o))) || (o.owner != p))",
        "p.owned_objects = setremove(p.owned_objects, o);",
        "player:tell(\"Removed \", $string_utils:nn(o), \" from \", $string_utils:nn(p), \"'s .owned_objects list.\");",
        "if (((typeof(o) == OBJ) && valid(o)) && (typeof(o.owner.owned_objects) == LIST))",
        "o.owner.owned_objects = setadd(o.owner.owned_objects, o);",
        "endif"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "3eb2b3f345ef9c9b3cf9e2341514324f4faba470891fc8f88e6b14c5a42509cf"
    }
  },
  "utility-wiz-connection-reports": {
    "value": "0",
    "output": [
      "show_netwho_listing source:",
      "\":show_netwho_listing(tell,player_list)\";",
      "\" prints a listing of the indicated players showing connect sites.\";",
      "{who, unsorted} = args;",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "elseif (!unsorted)",
      "show_netwho_from_listing source:",
      "\":show_netwho_from_listing(tell,site)\";",
      "\"@net-who from hoststring prints all players who have connected from that host or host substring.  Substring can include *'s, e.g. @net-who from *.foo.edu.\";",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "{tellwho, where} = args;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "show_netwho_listing source:",
        "\":show_netwho_listing(tell,player_list)\";",
        "\" prints a listing of the indicated players showing connect sites.\";",
        "{who, unsorted} = args;",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "elseif (!unsorted)",
        "return;",
        "endif",
        "su = $string_utils;",
        "au = $ansi_utils;",
        "alist = {};",
        "footnotes = {};",
        "show_netwho_from_listing source:",
        "\":show_netwho_from_listing(tell,site)\";",
        "\"@net-who from hoststring prints all players who have connected from that host or host substring.  Substring can include *'s, e.g. @net-who from *.foo.edu.\";",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "{tellwho, where} = args;",
        "su = $string_utils;",
        "if (!index(where, \"*\"))",
        "\"Oh good... search for users from a site... the fast way.  No wild cards.\";",
        "nl = 0;",
        "bozos = {};",
        "sites = $site_db:find_all_keys(where);"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8436d48b4ce7781ff13e6e8282482eebb47095e46ddc6a0b66920c790174aef8"
    }
  },
  "utility-wiz-maintenance": {
    "value": "0",
    "output": [
      "expire_mail source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "this:expire_mail_lists();",
      "this:expire_mail_players();",
      "expire_mail_players source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "s = 0;",
      "for p in (players())",
      "this.expiration_progress = p;",
      "expire_mail_lists source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "sum = 0;",
      "for x in ($object_utils:leaves_suspended($mail_recipient))",
      "this.expiration_progress = x;",
      "expire_mail_weekly source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "fork (((7 * 24) * 60) * 60)",
      "this:(verb)();",
      "endfork",
      "boot_idlers source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "endif",
      "\"------- constants ---- \";",
      "\"20 minutes idle for regular players\";",
      "mintime = 60 * 20;",
      "flush_editors source:",
      "if (!caller_perms().wizard)",
      "return E_PERM;",
      "else",
      "fork (86400 * 7)",
      "this:(verb)();",
      "endfork"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "expire_mail source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "this:expire_mail_lists();",
        "this:expire_mail_players();",
        "expire_mail_players source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "s = 0;",
        "for p in (players())",
        "this.expiration_progress = p;",
        "if ((p.owner == p) && is_player(p))",
        "s = s + (p:expire_old_messages() || 0);",
        "endif",
        "if (ticks_left() < 10000)",
        "set_task_perms($wiz_utils:random_wizard());",
        "suspend(0);",
        "expire_mail_lists source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "sum = 0;",
        "for x in ($object_utils:leaves_suspended($mail_recipient))",
        "this.expiration_progress = x;",
        "temp = x:expire_old_messages();",
        "if (typeof(temp) == INT)",
        "sum = sum + temp;",
        "endif",
        "\"just suspend for every fucker, I'm tired of losing.\";",
        "set_task_perms($wiz_utils:random_wizard());",
        "expire_mail_weekly source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "fork (((7 * 24) * 60) * 60)",
        "this:(verb)();",
        "endfork",
        "this:expire_mail();",
        "boot_idlers source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "endif",
        "\"------- constants ---- \";",
        "\"20 minutes idle for regular players\";",
        "mintime = 60 * 20;",
        "\"10 minutes for guests\";",
        "minguest = 60 * 10;",
        "\"wait 3 minutes before actually booting\";",
        "bootdelay = 3;",
        "\"start booting when there are 20 less than max players\";",
        "threshold = 20;",
        "flush_editors source:",
        "if (!caller_perms().wizard)",
        "return E_PERM;",
        "else",
        "fork (86400 * 7)",
        "this:(verb)();",
        "endfork",
        "player:tell(\"Flushing ancient editor sessions.\");",
        "for x in ({$verb_editor, $note_editor, $mail_editor})",
        "x:do_flush(time() - (30 * 86400), 0);",
        "$command_utils:suspend_if_needed(0);",
        "endfor",
        "endif"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "1e7c3f1a5f078a1b2433583f5419bddb682ad4443759485739dd9a20704cf28a"
    }
  },
  "utility-wiz-admin-report": {
    "value": "0",
    "output": [
      "LEARNER wizard identity: 0",
      "ADVERTISED count: 1",
      "CONNECTED count: 0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "LEARNER wizard identity: 0",
        "ADVERTISED count: 1",
        "CONNECTED count: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "dc2fa714692e33abaadd02a5ad21880de6c574c5aea901c4a1ad3759db9fe80d"
    }
  },
  "utility-command-budget": {
    "value": "0",
    "output": [
      "running_out_of_time source:",
      "\"Return true if we're running out of ticks or seconds.\";",
      "return (ticks_left() < 4000) || (seconds_left() < 2);",
      "\"If this verb is changed make sure to change :suspend_if_needed as well.\";",
      "suspend_if_needed source:",
      "\"Usage:  $command_utils:suspend_if_needed(<time>[, @<announcement>])\";",
      "\"See if we're running out of ticks or seconds, and if so suspend(<time>) and return true.  If more than one arg is given, print the remainder with player:tell.\";",
      "if ((ticks_left() < 4000) || (seconds_left() < 2))",
      "\"Note: above computation should be the same as :running_out_of_time.\";",
      "{?time = 10, @ann} = args;",
      "if (ann && valid(player))"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "running_out_of_time source:",
        "\"Return true if we're running out of ticks or seconds.\";",
        "return (ticks_left() < 4000) || (seconds_left() < 2);",
        "\"If this verb is changed make sure to change :suspend_if_needed as well.\";",
        "suspend_if_needed source:",
        "\"Usage:  $command_utils:suspend_if_needed(<time>[, @<announcement>])\";",
        "\"See if we're running out of ticks or seconds, and if so suspend(<time>) and return true.  If more than one arg is given, print the remainder with player:tell.\";",
        "if ((ticks_left() < 4000) || (seconds_left() < 2))",
        "\"Note: above computation should be the same as :running_out_of_time.\";",
        "{?time = 10, @ann} = args;",
        "if (ann && valid(player))",
        "player:tell(tostr(@ann));",
        "endif",
        "amount = max(time, min($login:current_lag(), 10));",
        "set_task_perms(caller_perms());",
        "\"this is trying to back off according to lag...\";",
        "suspend(amount);"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "bba0173eb791e3116ff3371d310f4ccd832a5fdd935df79ce27a25c330c3d8ce"
    }
  },
  "utility-command-input": {
    "value": "0",
    "output": [
      "read source:",
      "\"$command_utils:read() -- read a line of input from the player and return it\";",
      "\"Optional argument is a prompt portion to replace `a line of input' in the prompt.\";",
      "\"\";",
      "\"Returns E_PERM if the current task is not the most recent task spawned by a command from player.\";",
      "{?prompt = \"a line of input\"} = args;",
      "c = callers();",
      "yes_or_no source:",
      "\":yes-or-no([prompt]) -- prompts the player for a yes or no answer and returns a true value iff the player enters a line of input that is some prefix of \\\"yes\\\"\";",
      "\"\";",
      "\"Returns E_NONE if the player enters a blank line, E_INVARG, if the player enters something that isn't a prefix of \\\"yes\\\" or \\\"no\\\", and E_PERM if the current task is not a command task that has never called suspend().\";",
      "c = callers();",
      "p = c[$][5];",
      "p:notify(tostr(args ? args[1] + \" \" | \"\", \"[Enter `yes' or `no']\"));",
      "reading_input source:",
      "\"While input is being read() from a player, return 1. Otherwise return 0.\";",
      "{who} = args;",
      "return `who.reading_input ! ANY => 0';"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "read source:",
        "\"$command_utils:read() -- read a line of input from the player and return it\";",
        "\"Optional argument is a prompt portion to replace `a line of input' in the prompt.\";",
        "\"\";",
        "\"Returns E_PERM if the current task is not the most recent task spawned by a command from player.\";",
        "{?prompt = \"a line of input\"} = args;",
        "c = callers();",
        "p = c[$][5];",
        "p:notify(tostr(\"[Type \", prompt, \" or `@abort' to abort the command.]\"));",
        "try",
        "ans = read();",
        "if ($string_utils:trim(ans) == \"@abort\")",
        "p:notify(\">> Command Aborted <<\");",
        "yes_or_no source:",
        "\":yes-or-no([prompt]) -- prompts the player for a yes or no answer and returns a true value iff the player enters a line of input that is some prefix of \\\"yes\\\"\";",
        "\"\";",
        "\"Returns E_NONE if the player enters a blank line, E_INVARG, if the player enters something that isn't a prefix of \\\"yes\\\" or \\\"no\\\", and E_PERM if the current task is not a command task that has never called suspend().\";",
        "c = callers();",
        "p = c[$][5];",
        "p:notify(tostr(args ? args[1] + \" \" | \"\", \"[Enter `yes' or `no']\"));",
        "try",
        "ans = read(@((caller == p) || $perm_utils:controls(caller_perms(), p)) ? {p} | {});",
        "if (ans = $string_utils:trim(ans))",
        "if (ans == \"@abort\")",
        "p:notify(\">> Command Aborted <<\");",
        "kill_task(task_id());",
        "reading_input source:",
        "\"While input is being read() from a player, return 1. Otherwise return 0.\";",
        "{who} = args;",
        "return `who.reading_input ! ANY => 0';"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "ac181d1335b104eb55d1d3c78efa1f970aa80e9e24b07c2bfb40fefee7da73df"
    }
  },
  "utility-command-multiple-lines": {
    "value": "0",
    "output": [
      "read_lines source:",
      "\"$command_utils:read_lines([max]) -- read zero or more lines of input\";",
      "\"\";",
      "\"Returns a list of strings, the (up to MAX, if given) lines typed by the player.  Returns E_PERM if the current task is not a command task that has never called suspend().\";",
      "\"In order that one may enter arbitrary lines, including \\\"@abort\\\" or \\\".\\\", if the first character in an input line is `.' and there is some nonwhitespace afterwords, the `.' is dropped and the rest of the line is taken verbatim, so that, e.g., \\\".@abort\\\" enters as \\\"@abort\\\" and \\\"..\\\" enters as \\\".\\\".\";",
      "\"--- Inline editor ---\";",
      "return $edit_utils:editor();",
      "read_lines_escape source:",
      "\"$command_utils:read_lines_escape(escapes[,help]) -- read zero or more lines of input\";",
      "\"\";",
      "\"Similar to :read_lines() except that help is available and one may specify other escape sequences to terminate the read.\";",
      "\"  escapes should be either a string or list of strings; this specifies which inputs other from `.' or `@abort' should terminate the read (... don't use anything beginning with a `.').\";",
      "\"  help should be a string or list of strings to be printed in response to the player typing `?'; the first line of the help text should be a general comment about what the input text should be used for.  Successive lines should describe the effects of the alternative escapes.\";",
      "\"Returns {end,list-of-strings-input} where end is the particular line that terminated this input or 0 if input terminated normally with `.'.  Returns E_PERM if the current task is not a command task that has never called suspend().  \";",
      "dump_lines source:",
      "\":dump_lines(text) => text `.'-quoted for :read_lines()\";",
      "\"  text is assumed to be a list of strings\";",
      "\"Returns a corresponding list of strings which, when read via :read_lines, \";",
      "\"produces the original list of strings (essentially, any strings beginning \";",
      "\"with a period \\\".\\\" have the period doubled).\";",
      "\"The list returned includes a final \\\".\\\"\";"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "read_lines source:",
        "\"$command_utils:read_lines([max]) -- read zero or more lines of input\";",
        "\"\";",
        "\"Returns a list of strings, the (up to MAX, if given) lines typed by the player.  Returns E_PERM if the current task is not a command task that has never called suspend().\";",
        "\"In order that one may enter arbitrary lines, including \\\"@abort\\\" or \\\".\\\", if the first character in an input line is `.' and there is some nonwhitespace afterwords, the `.' is dropped and the rest of the line is taken verbatim, so that, e.g., \\\".@abort\\\" enters as \\\"@abort\\\" and \\\"..\\\" enters as \\\".\\\".\";",
        "\"--- Inline editor ---\";",
        "return $edit_utils:editor();",
        "\"--- Inline editor ---\";",
        "\"(Remove the above line if you wish for normal read_lines prompts.)\";",
        "{?max = 0} = args;",
        "c = callers();",
        "p = c[$][5];",
        "p:notify(tostr(\"[Type\", max ? tostr(\" up to \", max) | \"\", \" lines of input; use `.' to end or `@abort' to abort the command.]\"));",
        "read_lines_escape source:",
        "\"$command_utils:read_lines_escape(escapes[,help]) -- read zero or more lines of input\";",
        "\"\";",
        "\"Similar to :read_lines() except that help is available and one may specify other escape sequences to terminate the read.\";",
        "\"  escapes should be either a string or list of strings; this specifies which inputs other from `.' or `@abort' should terminate the read (... don't use anything beginning with a `.').\";",
        "\"  help should be a string or list of strings to be printed in response to the player typing `?'; the first line of the help text should be a general comment about what the input text should be used for.  Successive lines should describe the effects of the alternative escapes.\";",
        "\"Returns {end,list-of-strings-input} where end is the particular line that terminated this input or 0 if input terminated normally with `.'.  Returns E_PERM if the current task is not a command task that has never called suspend().  \";",
        "\"@abort and lines beginning with `.' are treated exactly as with :read_lines()\";",
        "{escapes, ?help = \"You are currently in a read loop.\"} = args;",
        "c = callers();",
        "p = c[$][5];",
        "escapes = {\".\", \"@abort\", @(typeof(escapes) == LIST) ? escapes | {escapes}};",
        "p:notify(tostr(\"[Type lines of input; `?' for help; end with `\", $string_utils:english_list(escapes, \"\", \"' or `\", \"', `\", \"\"), \"'.]\"));",
        "dump_lines source:",
        "\":dump_lines(text) => text `.'-quoted for :read_lines()\";",
        "\"  text is assumed to be a list of strings\";",
        "\"Returns a corresponding list of strings which, when read via :read_lines, \";",
        "\"produces the original list of strings (essentially, any strings beginning \";",
        "\"with a period \\\".\\\" have the period doubled).\";",
        "\"The list returned includes a final \\\".\\\"\";",
        "text = args[1];",
        "newtext = {};",
        "i = lasti = 0;",
        "for line in (text)",
        "if (match(line, \"^%(%.%| *@abort *$%)\"))",
        "newtext = {@newtext, @(i > lasti) ? text[lasti + 1..i] | {}, \".\" + line};"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "72ecab8f81789b48236e7ed5a0c3b264470bbdec95010f668a02eb2414143851"
    }
  },
  "utility-command-quoting": {
    "value": "0",
    "output": [
      "ENCODED lines:",
      "\"brush\"",
      "\"..\"",
      "\".@abort\"",
      "\".\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ENCODED lines:",
        "\"...brush\"",
        "\"..\"",
        "\".@abort\"",
        "\".\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "42caf3416eaa5f13d9bb9215b3f494cd5d2bfdca0832e08001823dafe9c7f40e"
    }
  },
  "utility-command-feedback": {
    "value": "0",
    "output": [
      "OBJECT feedback:",
      "I see no \"brush\" here.",
      "OBJECT failed: 1",
      "PLAYER feedback:",
      "You must give the name of some player.",
      "PLAYER failed: 1",
      "PLAYER results: {0, #127}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "OBJECT feedback:",
        "You must give the name of some object.",
        "OBJECT failed: 1",
        "PLAYER feedback:",
        "You must give the name of some player.",
        "PLAYER failed: 1",
        "PLAYER results: {0, #127}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "affb935a25ec5ae85979c90aed7d707a45a29fd218f2c30f97ad67fb0949435c"
    }
  },
  "utility-command-task": {
    "value": "0",
    "output": [
      "task_info source:",
      "\"task_info(task id)\";",
      "\"Return info (the same info supplied by queued_tasks()) about a given task id, or E_INVARG if there's no such task queued.\";",
      "\"WIZARDLY\";",
      "set_task_perms(caller_perms());",
      "tasks = queued_tasks();",
      "task_id = args[1];"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "task_info source:",
        "\"task_info(task id)\";",
        "\"Return info (the same info supplied by queued_tasks()) about a given task id, or E_INVARG if there's no such task queued.\";",
        "\"WIZARDLY\";",
        "set_task_perms(caller_perms());",
        "tasks = queued_tasks();",
        "task_id = args[1];",
        "for task in (tasks)",
        "if (task[1] == task_id)",
        "return task;",
        "endif",
        "endfor",
        "return E_INVARG;"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "TASK information: E_INVARG"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "TASK information: E_INVARG"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "44a2f714677fa884384b25a7c59845f3b4bc579928a36594ee6b5ca039bd7bf3"
    }
  },
  "utility-command-yield-delimiters": {
    "value": "0",
    "output": [
      "suspend source:",
      "\"Suspend, using output_delimiters() in case a client needs to keep track\";",
      "\"of the output of the current command.\";",
      "\"Args are TIME, amount of time to suspend, and optional (misnamed) OUTPUT.\";",
      "\"If given no OUTPUT, just do a suspend.\";",
      "\"If OUTPUT is neither list nor string, suspend and return output_delimiters\";",
      "\"If OUTPUT is a list, it should be in the output_delimiters() format:\";",
      "kill_if_laggy source:",
      "\"Kills this task if the current lag is greater than args[1].  Args[2..n] will be passed to player:tell.\";",
      "cutoff = args[1];",
      "if ($login:current_lag() > cutoff)",
      "player:tell(@listdelete(args, 1));",
      "kill_task(task_id());",
      "endif"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "suspend source:",
        "\"Suspend, using output_delimiters() in case a client needs to keep track\";",
        "\"of the output of the current command.\";",
        "\"Args are TIME, amount of time to suspend, and optional (misnamed) OUTPUT.\";",
        "\"If given no OUTPUT, just do a suspend.\";",
        "\"If OUTPUT is neither list nor string, suspend and return output_delimiters\";",
        "\"If OUTPUT is a list, it should be in the output_delimiters() format:\";",
        "\"  {PREFIX, SUFFIX}.  Use these to handle that client stuff.\";",
        "\"If OUTPUT is a string, it should be SUFFIX (output_delimiters[2])\";",
        "\"\";",
        "\"Proper usage:\";",
        "\"The first time you want to suspend, use\";",
        "\"  output_delimiters = $command_utils:suspend(time, x);\";",
        "kill_if_laggy source:",
        "\"Kills this task if the current lag is greater than args[1].  Args[2..n] will be passed to player:tell.\";",
        "cutoff = args[1];",
        "if ($login:current_lag() > cutoff)",
        "player:tell(@listdelete(args, 1));",
        "kill_task(task_id());",
        "endif"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8555549ad81c133f3db55b46817fb78cad65128d19639521e7a85c9477e42dbf"
    }
  },
  "utility-command-dispatch": {
    "value": "0",
    "output": [
      "do_huh source:",
      "\":do_huh(verb,args)  what :huh should do by default.\";",
      "{verb, args} = args;",
      "if ($perm_utils:controls(caller_perms(), player) || (caller_perms() == player))",
      "this.feature_task = {task_id(), verb, args, argstr, dobj, dobjstr, prepstr, iobj, iobjstr};",
      "endif",
      "set_task_perms(cp = caller_perms());",
      "explain_syntax source:",
      "\":explain_syntax(here,verb,args)\";",
      "verb = args[2];",
      "for x in ({player, args[1], @valid(dobj) ? {dobj} | {}, @valid(iobj) ? {iobj} | {}})",
      "what = x;",
      "while (hv = $object_utils:has_verb(what, verb))",
      "what = hv[1];",
      "validate_feature source:",
      "\":validate_feature(verb, args)\";",
      "\"  (where `verb' and `args' are the arguments passed to :my_huh)\";",
      "\"  returns true or false based on whether this is the same command typed by the user (comparing it against $command_utils.feature_task, set by $command_utils:do_huh).\";",
      "\"  assumes that the :my_huh parsing has not suspended\";",
      "return {task_id(), @args, argstr, dobj, dobjstr, prepstr, iobj, iobjstr} == this.feature_task;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "do_huh source:",
        "\":do_huh(verb,args)  what :huh should do by default.\";",
        "{verb, args} = args;",
        "if ($perm_utils:controls(caller_perms(), player) || (caller_perms() == player))",
        "this.feature_task = {task_id(), verb, args, argstr, dobj, dobjstr, prepstr, iobj, iobjstr};",
        "endif",
        "set_task_perms(cp = caller_perms());",
        "notify = $perm_utils:controls(cp, player) ? \"notify\" | \"tell\";",
        "if (verb == \"\")",
        "\"should only happen if a player types backslash\";",
        "player:(notify)(\"I don't understand that.\");",
        "return;",
        "endif",
        "explain_syntax source:",
        "\":explain_syntax(here,verb,args)\";",
        "verb = args[2];",
        "for x in ({player, args[1], @valid(dobj) ? {dobj} | {}, @valid(iobj) ? {iobj} | {}})",
        "what = x;",
        "while (hv = $object_utils:has_verb(what, verb))",
        "what = hv[1];",
        "i = 1;",
        "while (i = $code_utils:find_verb_named(what, verb, i))",
        "if (evs = $code_utils:explain_verb_syntax(x, verb, @verb_args(what, i)))",
        "player:tell(\"Try this instead:  \", evs);",
        "return 1;",
        "endif",
        "validate_feature source:",
        "\":validate_feature(verb, args)\";",
        "\"  (where `verb' and `args' are the arguments passed to :my_huh)\";",
        "\"  returns true or false based on whether this is the same command typed by the user (comparing it against $command_utils.feature_task, set by $command_utils:do_huh).\";",
        "\"  assumes that the :my_huh parsing has not suspended\";",
        "return {task_id(), @args, argstr, dobj, dobjstr, prepstr, iobj, iobjstr} == this.feature_task;"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "6d8c034579409d9b9274aba407e02e39b4a465a592d758e1f3b46c6f2cb5234a"
    }
  },
  "utility-command-prompt-report": {
    "value": "0",
    "output": [
      "read source:",
      "\"$command_utils:read() -- read a line of input from the player and return it\";",
      "\"Optional argument is a prompt portion to replace `a line of input' in the prompt.\";",
      "\"\";",
      "\"Returns E_PERM if the current task is not the most recent task spawned by a command from player.\";",
      "{?prompt = \"a line of input\"} = args;",
      "c = callers();"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "read source:",
        "\"$command_utils:read() -- read a line of input from the player and return it\";",
        "\"Optional argument is a prompt portion to replace `a line of input' in the prompt.\";",
        "\"\";",
        "\"Returns E_PERM if the current task is not the most recent task spawned by a command from player.\";",
        "{?prompt = \"a line of input\"} = args;",
        "c = callers();",
        "p = c[$][5];",
        "p:notify(tostr(\"[Type \", prompt, \" or `@abort' to abort the command.]\"));",
        "try",
        "ans = read();",
        "if ($string_utils:trim(ans) == \"@abort\")",
        "p:notify(\">> Command Aborted <<\");"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "0b624df6952aa72ea49dcfdce278fbc1040528ca07ecba3f4f6e672a1e2edd1e"
    }
  },
  "utility-code-types": {
    "value": "0",
    "output": [
      "TOINT: 42",
      "TOOBJ: #55",
      "INVALID integer: E_TYPE",
      "TYPE list: \"LIST\"",
      "TYPE map limitation: \"NONE\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "TOINT: -7",
        "TOOBJ: #55",
        "INVALID integer: E_TYPE",
        "TYPE list: \"LIST\"",
        "TYPE map limitation: \"NONE\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "5e1b9c3c4b0b639789eb726953d51f8879bca61ef684853b5f1b057c57d4abfd"
    }
  },
  "utility-code-errors": {
    "value": "0",
    "output": [
      "ERROR value: E_PROPNF",
      "ERROR name: \"E_PROPNF\"",
      "UNKNOWN error name: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ERROR value: E_VERBNF",
        "ERROR name: \"E_VERBNF\"",
        "UNKNOWN error name: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "a4e4fa5adca1cc4a8f05096c5be7fb67cfc368666b6c862f20239e11bd8192a8"
    }
  },
  "utility-code-references": {
    "value": "0",
    "output": [
      "PROPERTY reference: {\"#55\", \"name\"}",
      "VERB reference: {\"#55\", \"range\"}",
      "CORIFIED name: \"$list_utils\"",
      "MISSING namespace: E_PROPNF"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "PROPERTY reference: {\"#27\", \"name\"}",
        "VERB reference: {\"#55\", \"range\"}",
        "CORIFIED name: \"$list_utils\"",
        "MISSING namespace: E_PROPNF"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "b4e20db6f2a1f4b8b78844642777da39fea3738fea55da00968cd752cca4fd27"
    }
  },
  "utility-code-names": {
    "value": "0",
    "output": [
      "FIRST number: 2",
      "LAST number: 2",
      "CALLABLE number: 2",
      "ABBREVIATION match: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "FIRST number: 1",
        "LAST number: 1",
        "CALLABLE number: 1",
        "ABBREVIATION match: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "16d80716cd49d0e82cc7080b6aa7395e891db6b5cd90cbe1226c013f29a56450"
    }
  },
  "utility-code-arguments": {
    "value": "0",
    "output": [
      "ARGSPEC: {{\"this\", \"none\", \"this\"}, {\"remaining\"}}",
      "PROGRAMMATIC syntax: 0",
      "ARGSTR: \"at bench\""
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ARGSPEC: {{\"this\", \"none\", \"this\"}, {\"extra\"}}",
        "PROGRAMMATIC syntax: 0",
        "ARGSTR: \"at bench\""
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "e12c8363cc7303bd734abc3ad523802b58487687d394baa749e0ca19fec55e3d"
    }
  },
  "utility-code-prepositions": {
    "value": "0",
    "output": [
      "prepositions source:",
      "if (server_version() != this._version)",
      "this:_fix_preps();",
      "endif",
      "return this.prepositions;",
      "short_prep source:",
      "\":short_prep(p) => shortest preposition equivalent to p\";",
      "\"p may be a single word or one of the strings returned by verb_args().\";",
      "if (server_version() != this._version)",
      "this:_fix_preps();",
      "endif",
      "word = args[1];",
      "full_prep source:",
      "if (server_version() != this._version)",
      "this:_fix_preps();",
      "endif",
      "prep = args[1];",
      "if (p = prep in this._short_preps)",
      "return this.prepositions[p];",
      "get_prep source:",
      "\":get_prep(@args) extracts the prepositional phrase from the front of args, returning a list consisting of the preposition (or \\\"\\\", if none) followed by the unused args.\";",
      "\":get_prep(\\\"in\\\",\\\"front\\\",\\\"of\\\",...) => {\\\"in front of\\\",...}\";",
      "\":get_prep(\\\"inside\\\",...)          => {\\\"inside\\\",...}\";",
      "\":get_prep(\\\"frabulous\\\",...}       => {\\\"\\\", \\\"frabulous\\\",...}\";",
      "prep = \"\";",
      "allpreps = {@this._short_preps, @this._other_preps};"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "prepositions source:",
        "if (server_version() != this._version)",
        "this:_fix_preps();",
        "endif",
        "return this.prepositions;",
        "short_prep source:",
        "\":short_prep(p) => shortest preposition equivalent to p\";",
        "\"p may be a single word or one of the strings returned by verb_args().\";",
        "if (server_version() != this._version)",
        "this:_fix_preps();",
        "endif",
        "word = args[1];",
        "word = word[1..index(word + \"/\", \"/\") - 1];",
        "if (p = word in this._other_preps)",
        "return this._short_preps[this._other_preps_n[p]];",
        "elseif (word in this._short_preps)",
        "return word;",
        "else",
        "full_prep source:",
        "if (server_version() != this._version)",
        "this:_fix_preps();",
        "endif",
        "prep = args[1];",
        "if (p = prep in this._short_preps)",
        "return this.prepositions[p];",
        "elseif (p = prep in this._other_preps)",
        "return this.prepositions[this._other_preps_n[p]];",
        "else",
        "return \"\";",
        "endif",
        "get_prep source:",
        "\":get_prep(@args) extracts the prepositional phrase from the front of args, returning a list consisting of the preposition (or \\\"\\\", if none) followed by the unused args.\";",
        "\":get_prep(\\\"in\\\",\\\"front\\\",\\\"of\\\",...) => {\\\"in front of\\\",...}\";",
        "\":get_prep(\\\"inside\\\",...)          => {\\\"inside\\\",...}\";",
        "\":get_prep(\\\"frabulous\\\",...}       => {\\\"\\\", \\\"frabulous\\\",...}\";",
        "prep = \"\";",
        "allpreps = {@this._short_preps, @this._other_preps};",
        "rest = 1;",
        "for i in [1..length(args)]",
        "accum = (i == 1) ? args[1] | tostr(accum, \" \", args[i]);",
        "if (accum in allpreps)",
        "prep = accum;",
        "rest = i + 1;"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "PREPOSITION groups: 15",
        "SHORT inside: \"in\"",
        "FULL in: \"in/inside/into\"",
        "CONSUMED phrase: {\"in front of\", \"bench\"}"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "PREPOSITION groups: 15",
        "SHORT inside: \"in\"",
        "FULL in: \"in/inside/into\"",
        "CONSUMED phrase: {\"in front of\", \"door\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "afee8c21dae53bcf858094af790e9be581b6dbcce5ad0aec08002886b58daf94"
    }
  },
  "utility-code-substitution": {
    "value": "0",
    "output": [
      "SUBSTITUTED: \"total = total + 1;\"",
      "QUOTED fragment: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "SUBSTITUTED: \"quantity = quantity + 1;\"",
        "QUOTED fragment: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "e7f02d2e37f0033b5295c3ceb55e7f517a3eb15cc7d914fd96f8cb25935abd8a"
    }
  },
  "utility-code-comments": {
    "value": "0",
    "output": [
      "COMMENTS: {\"\\\"Inventory notes\\\";\", \"\\\"Count brushes\\\";\"}",
      "TEXT again: {\"Inventory notes\", \"Count brushes\"}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "COMMENTS: {\"\\\"Inventory notes\\\";\", \"\\\"Count saws\\\";\"}",
        "TEXT again: {\"Inventory notes\", \"Count saws\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "9e6e2a20b901d94b6f3b5639255b18b9b548dfec5475dfae1a809bdf84809d95"
    }
  },
  "utility-code-accessors": {
    "value": "0",
    "output": [
      "GET before: 3",
      "SET result: 7",
      "GET after: 7"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "GET before: 3",
        "SET result: 9",
        "GET after: 9"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "b267e075adcfc679cae938858d7c3f8dc96dc733e12385f2f7005a132884f3f5"
    }
  },
  "utility-code-documentation": {
    "value": "0",
    "output": [
      "set_verb_documentation source:",
      "\":set_verb_documentation(object,verbname,text)\";",
      "\"  changes documentation at beginning of verb code\";",
      "\"  text is either a string or a list of strings\";",
      "\"  returns a non-1 value if anything bad happens...\";",
      "set_task_perms(caller_perms());",
      "{object, vname, text} = args;",
      "verb_documentation source:",
      "\":verb_documentation([object,verbname]) => documentation at beginning of verb code, if any\";",
      "\"default is the calling verb\";",
      "set_task_perms(caller_perms());",
      "c = callers()[1];",
      "{?object = c[4], ?vname = c[2]} = args;",
      "try",
      "verb_usage source:",
      "\":verb_usage([object,verbname]) => usage string at beginning of verb code, if any\";",
      "\"default is the calling verb\";",
      "set_task_perms(caller_perms());",
      "c = callers()[1];",
      "{?object = c[4], ?vname = c[2]} = args;",
      "if (typeof(code = `verb_code(object, vname) ! ANY') == ERR)"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "set_verb_documentation source:",
        "\":set_verb_documentation(object,verbname,text)\";",
        "\"  changes documentation at beginning of verb code\";",
        "\"  text is either a string or a list of strings\";",
        "\"  returns a non-1 value if anything bad happens...\";",
        "set_task_perms(caller_perms());",
        "{object, vname, text} = args;",
        "if (typeof(code = `verb_code(object, vname) ! ANY') == ERR)",
        "return code;",
        "elseif (typeof(vd = $code_utils:verb_documentation(object, vname)) == ERR)",
        "return vd;",
        "elseif (!(typeof(text) in {LIST, STR}))",
        "return E_INVARG;",
        "verb_documentation source:",
        "\":verb_documentation([object,verbname]) => documentation at beginning of verb code, if any\";",
        "\"default is the calling verb\";",
        "set_task_perms(caller_perms());",
        "c = callers()[1];",
        "{?object = c[4], ?vname = c[2]} = args;",
        "try",
        "code = verb_code(object, vname);",
        "except error (ANY)",
        "return error[2];",
        "endtry",
        "doc = {};",
        "for line in (code)",
        "verb_usage source:",
        "\":verb_usage([object,verbname]) => usage string at beginning of verb code, if any\";",
        "\"default is the calling verb\";",
        "set_task_perms(caller_perms());",
        "c = callers()[1];",
        "{?object = c[4], ?vname = c[2]} = args;",
        "if (typeof(code = `verb_code(object, vname) ! ANY') == ERR)",
        "return code;",
        "else",
        "doc = {};",
        "indent = \"^$\";",
        "for line in (code)",
        "if (match(line, \"^\\\"%([^\\\\\\\"]%|\\\\.%)*\\\";$\"))"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "SET documentation: 1",
        "DOCUMENTATION: {\"Usage: example()\"}",
        "USAGE: {\"Usage: example\"}",
        "BEHAVIOR unchanged: 3"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "SET documentation: 1",
        "DOCUMENTATION: {\"Usage: example()\"}",
        "USAGE: {\"Usage: example\"}",
        "BEHAVIOR unchanged: 4"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "2a080d414543580c0c7694b85f9500bfac83994f98287eb0d10f8ec7f6f77019"
    }
  },
  "utility-code-inspection": {
    "value": "0",
    "output": [
      "OBJECT report:",
      "Object ID:  #55",
      "Name:       List Utilities",
      "Parent:     Generic Utilities Package (#78)",
      "Location:   *** NONE ***",
      "Owner:      Hacker (#36)",
      "Flags:      r",
      "PROPERTY report:",
      "#55.name",
      "Built-in property.",
      "Value:        \"List Utilities\"",
      "VERB report:",
      "#55:range",
      "Owner:            Hacker (#36)",
      "Permissions:      rxd",
      "Direct Object:    this",
      "Preposition:      none",
      "Indirect Object:  this"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "OBJECT report:",
        "Object ID:  #55",
        "Name:       List Utilities",
        "Parent:     Generic Utilities Package (#78)",
        "Location:   *** NONE ***",
        "Owner:      Hacker (#36)",
        "Flags:      r",
        "PROPERTY report:",
        "#55.name",
        "Built-in property.",
        "Value:        \"List Utilities\"",
        "VERB report:",
        "#55:make",
        "Owner:            Hacker (#36)",
        "Permissions:      rxd",
        "Direct Object:    this",
        "Preposition:      none",
        "Indirect Object:  this"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "da416a22cdfe77d52f185e2703058adec060c6e364aa29306877b4aad02a1f8f"
    }
  },
  "utility-code-source-search": {
    "value": "0",
    "output": [
      "find_verbs_containing source:",
      "\"$code_utils:find_verbs_containing(pattern[,object|object-list[,casematters]])\";",
      "\"$code_utils:find_verbs_matching(pattern[,object|object-list[,casematters]])\";",
      "\"$code_utils:find_verb_lines_containing(pattern[,object|object-list[,casematters]])\";",
      "\"$code_utils:find_verb_lines_matching(pattern[,object|object-list[,casematters]])\";",
      "\"\";",
      "\"Print (to player) the name and owner of every verb in the database whose code\";"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "find_verbs_containing source:",
        "\"$code_utils:find_verbs_containing(pattern[,object|object-list[,casematters]])\";",
        "\"$code_utils:find_verbs_matching(pattern[,object|object-list[,casematters]])\";",
        "\"$code_utils:find_verb_lines_containing(pattern[,object|object-list[,casematters]])\";",
        "\"$code_utils:find_verb_lines_matching(pattern[,object|object-list[,casematters]])\";",
        "\"\";",
        "\"Print (to player) the name and owner of every verb in the database whose code\";",
        "\"  (find_verbs_containing) contains PATTERN as a substring \";",
        "\"  (find_verbs_matching)   has a substring matches the regular expression PATTERN .\";",
        "\"Optional second argument limits the search to the specified object or objects.\";",
        "\"Optional third argument if true specifies case-sensitive matching.\";",
        "\":find_verbs_*() prints the first matching line in a verb while\";",
        "\":find_verb_lines_*() prints all matching lines\";"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "LITERAL first matching lines:",
        "#27:union [Hacker (#36)]:  \"Returns the set union of all of the lists provided as arguments.\";",
        "#27:intersection [Hacker (#36)]:  \"Returns the set intersection of all the lists provided as arguments.\";",
        "#27:diff*erence [Hacker (#36)]:  \"Returns all elements of set 1 that are not in sets 2..n\";",
        "#27:contains [Hacker (#36)]:  \"a superset of {}.  If only one list is given, return true.\";",
        "#27:exclusive_or xor [Hacker (#36)]:  \"Return the set of all elements that are in exactly one of the input sets\";",
        "#27:difference_suspended diff_suspended [Hacker (#36)]:  \"Returns all elements of set 1 that are not in sets 2..n\";",
        "#27:equal [Hacker (#36)]:      return 0;",
        "#27:intersection_preserve_case [Hacker (#36)]:  \"a version of $set_utils:intersection that maintains the property that everything in the return value is in the first argument, even considering case\";",
        "",
        "Total: 8 verbs.",
        "REGEX all matching lines:",
        "#27:union [Hacker (#36)]:  return {};",
        "#27:union [Hacker (#36)]:  return set;",
        "#27:intersection [Hacker (#36)]:  return {};",
        "#27:intersection [Hacker (#36)]:  return result;",
        "#27:diff*erence [Hacker (#36)]:  return set;",
        "#27:contains [Hacker (#36)]:  return 0;",
        "#27:contains [Hacker (#36)]:  return 1;",
        "#27:exclusive_or xor [Hacker (#36)]:  return {};",
        "#27:exclusive_or xor [Hacker (#36)]:  return set;",
        "#27:difference_suspended diff_suspended [Hacker (#36)]:  return set;",
        "#27:equal [Hacker (#36)]:  return 0;",
        "#27:equal [Hacker (#36)]:  return 0;",
        "#27:equal [Hacker (#36)]:  return 1;",
        "#27:intersection_preserve_case [Hacker (#36)]:  return {};",
        "#27:intersection_preserve_case [Hacker (#36)]:  return result;",
        "",
        "Total: 8 verbs."
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "LITERAL first matching lines:",
        "",
        "Total: 0 verbs.",
        "REGEX all matching lines:",
        "#27:union [Hacker (#36)]:  return {};",
        "#27:union [Hacker (#36)]:  return set;",
        "#27:intersection [Hacker (#36)]:  return {};",
        "#27:intersection [Hacker (#36)]:  return result;",
        "#27:diff*erence [Hacker (#36)]:  return set;",
        "#27:contains [Hacker (#36)]:  return 0;",
        "#27:contains [Hacker (#36)]:  return 1;",
        "#27:exclusive_or xor [Hacker (#36)]:  return {};",
        "#27:exclusive_or xor [Hacker (#36)]:  return set;",
        "#27:difference_suspended diff_suspended [Hacker (#36)]:  return set;",
        "#27:equal [Hacker (#36)]:  return 0;",
        "#27:equal [Hacker (#36)]:  return 0;",
        "#27:equal [Hacker (#36)]:  return 1;",
        "#27:intersection_preserve_case [Hacker (#36)]:  return {};",
        "#27:intersection_preserve_case [Hacker (#36)]:  return result;",
        "",
        "Total: 8 verbs."
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "579668a34460843ca447722f40d0d55dff092e562b3bbc361284d52b564c2038"
    }
  },
  "utility-code-stack": {
    "value": "0",
    "output": [
      "verb_perms source:",
      "\"returns the permissions of the current verb (either the owner or the result of the most recent set_task_perms()).\";",
      "return caller_perms();",
      "verb_location source:",
      "\"returns the object where the current verb is defined.\";",
      "return callers()[1][4];",
      "verb_frame source:",
      "\"returns the callers() frame for the current verb.\";",
      "return callers()[1];",
      "verb_all_frames source:",
      "\"returns {this:verb_frame(), @callers()}.\";",
      "return callers();",
      "dflag_on source:",
      "\"Syntax:  $code_utils:dflag_on()   => 0|1\";",
      "\"\";",
      "\"Returns true if the verb calling the verb that called this verb has the `d' flag set true. Returns false if it is !d. If there aren't that many callers, or the calling verb was a builtin such as eval, assume the debug flag is on for traceback purposes and return true.\";",
      "\"This is useful for determining whether the calling verb should return or raise an error to the verb that called it.\";",
      "return (length(c = callers()) >= 2) ? `index(verb_info(c[2][4], c[2][2])[2], \"d\") && 1 ! E_INVARG => 1' | 1;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "verb_perms source:",
        "\"returns the permissions of the current verb (either the owner or the result of the most recent set_task_perms()).\";",
        "return caller_perms();",
        "verb_location source:",
        "\"returns the object where the current verb is defined.\";",
        "return callers()[1][4];",
        "verb_frame source:",
        "\"returns the callers() frame for the current verb.\";",
        "return callers()[1];",
        "verb_all_frames source:",
        "\"returns {this:verb_frame(), @callers()}.\";",
        "return callers();",
        "dflag_on source:",
        "\"Syntax:  $code_utils:dflag_on()   => 0|1\";",
        "\"\";",
        "\"Returns true if the verb calling the verb that called this verb has the `d' flag set true. Returns false if it is !d. If there aren't that many callers, or the calling verb was a builtin such as eval, assume the debug flag is on for traceback purposes and return true.\";",
        "\"This is useful for determining whether the calling verb should return or raise an error to the verb that called it.\";",
        "return (length(c = callers()) >= 2) ? `index(verb_info(c[2][4], c[2][2])[2], \"d\") && 1 ! E_INVARG => 1' | 1;"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "PERMISSIONS: #127",
        "DEFINITION location: #-1",
        "CALLING frame: {#-1, \"emergency_mode\", #127, #-1, #127}",
        "ALL frame count: 1",
        "DEBUG enabled: 1"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "PERMISSIONS: #127",
        "DEFINITION location: #-1",
        "CALLING frame: {#-1, \"emergency_mode\", #127, #-1, #127}",
        "ALL frame count: 1",
        "DEBUG enabled: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "18e57db8938ebad85d83cac0ecddfb7342471d78520aa92c2f59a55234e6470f"
    }
  },
  "utility-code-tasks": {
    "value": "0",
    "output": [
      "task_valid source:",
      "\"task_valid(INT id)\";",
      "\"Return true iff there is currently a valid task with the given id.\";",
      "set_task_perms($no_one);",
      "{id} = args;",
      "t = $list_utils:slice(queued_tasks(), 1);",
      "return ((id == task_id()) || (id in t)) || (E_PERM == `kill_task(id) ! ANY');",
      "task_owner source:",
      "\":task_owner(INT task_id) => returns the owner of the task belonging to the id.\";",
      "if (a = $list_utils:assoc(args[1], queued_tasks()))",
      "return a[5];",
      "else",
      "return E_INVARG;",
      "endif",
      "owns_task source:",
      "\"$code_utils:owns_task(task_id, who)\";",
      "\"The purpose of this is to be faster than $code_utils:task_owner(task_id) in those cases where you are interested in whether a certain person owns the task rather than in determining the owner of a task where you have no preconceived notion of the owner.\";",
      "return $list_utils:assoc(args[1], $wiz_utils:queued_tasks(args[2]));"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "task_valid source:",
        "\"task_valid(INT id)\";",
        "\"Return true iff there is currently a valid task with the given id.\";",
        "set_task_perms($no_one);",
        "{id} = args;",
        "t = $list_utils:slice(queued_tasks(), 1);",
        "return ((id == task_id()) || (id in t)) || (E_PERM == `kill_task(id) ! ANY');",
        "task_owner source:",
        "\":task_owner(INT task_id) => returns the owner of the task belonging to the id.\";",
        "if (a = $list_utils:assoc(args[1], queued_tasks()))",
        "return a[5];",
        "else",
        "return E_INVARG;",
        "endif",
        "owns_task source:",
        "\"$code_utils:owns_task(task_id, who)\";",
        "\"The purpose of this is to be faster than $code_utils:task_owner(task_id) in those cases where you are interested in whether a certain person owns the task rather than in determining the owner of a task where you have no preconceived notion of the owner.\";",
        "return $list_utils:assoc(args[1], $wiz_utils:queued_tasks(args[2]));"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "TASK valid: 0",
        "TASK owner: E_INVARG",
        "OWNS task: {}"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "TASK valid: 0",
        "TASK owner: E_INVARG",
        "OWNS task: {}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "43ee880e4192285f038e029f2134fd89402ac66bd16acaa2cf7e5f3a79401e20"
    }
  },
  "utility-code-move-members": {
    "value": "0",
    "output": [
      "move_property source:",
      "\":move_prop(OBJ from, STR prop name, OBJ to, [STR new prop name]) -> Moves the specified property and its contents from one object to another. Returns {OBJ, property name} where the property now resides if successful, error if not. To succeed, caller_perms() must control both objects and own the property, unless called with wizard perms. Supplying a fourth argument gives the property a new name on the new object.\";",
      "who = caller_perms();",
      "{from, origprop, to, ?destprop = origprop} = args;",
      "if ((((typeof(from) != OBJ) || (typeof(to) != OBJ)) || (typeof(origprop) != STR)) || (typeof(destprop) != STR))",
      "return E_TYPE;",
      "elseif ((!valid(from)) || (!valid(to)))",
      "move_verb source:",
      "\":move_verb(OBJ from, STR verb name, OBJ to, [STR new verb name]) -> Moves the specified verb from one object to another. Returns {OBJ, Full verb name} where the verb now resides if successful, error if not. To succeed, caller_perms() must control both objects and own the verb, unless called with wizard perms. Supplying a fourth argument moves the verb to a new name.\";",
      "\"Should handle verbnames with aliases and wildcards correctly.\";",
      "who = caller_perms();",
      "{from, origverb, to, ?destverb = origverb} = args;",
      "if ((((typeof(from) != OBJ) || (typeof(to) != OBJ)) || (typeof(origverb) != STR)) || (typeof(destverb) != STR))",
      "\"check this first so we can parse out long verb names next\";"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "move_property source:",
        "\":move_prop(OBJ from, STR prop name, OBJ to, [STR new prop name]) -> Moves the specified property and its contents from one object to another. Returns {OBJ, property name} where the property now resides if successful, error if not. To succeed, caller_perms() must control both objects and own the property, unless called with wizard perms. Supplying a fourth argument gives the property a new name on the new object.\";",
        "who = caller_perms();",
        "{from, origprop, to, ?destprop = origprop} = args;",
        "if ((((typeof(from) != OBJ) || (typeof(to) != OBJ)) || (typeof(origprop) != STR)) || (typeof(destprop) != STR))",
        "return E_TYPE;",
        "elseif ((!valid(from)) || (!valid(to)))",
        "return E_INVARG;",
        "elseif ((from == to) && (destprop == origprop))",
        "\"Moving same prop onto the same object puts the contents in the wrong one. Just not allow\";",
        "return E_NACC;",
        "elseif (((!$perm_utils:controls(who, from)) && (!from.w)) || ((!$perm_utils:controls(who, to)) && (!to.w)))",
        "\"caller_perms() is not allowed to hack on either object in question\";",
        "move_verb source:",
        "\":move_verb(OBJ from, STR verb name, OBJ to, [STR new verb name]) -> Moves the specified verb from one object to another. Returns {OBJ, Full verb name} where the verb now resides if successful, error if not. To succeed, caller_perms() must control both objects and own the verb, unless called with wizard perms. Supplying a fourth argument moves the verb to a new name.\";",
        "\"Should handle verbnames with aliases and wildcards correctly.\";",
        "who = caller_perms();",
        "{from, origverb, to, ?destverb = origverb} = args;",
        "if ((((typeof(from) != OBJ) || (typeof(to) != OBJ)) || (typeof(origverb) != STR)) || (typeof(destverb) != STR))",
        "\"check this first so we can parse out long verb names next\";",
        "return E_TYPE;",
        "endif",
        "origverb_first = strsub(origverb[1..index(origverb + \" \", \" \") - 1], \"*\", \"\") || \"*\";",
        "destverb_first = strsub(destverb[1..index(destverb + \" \", \" \") - 1], \"*\", \"\") || \"*\";",
        "if ((!valid(from)) || (!valid(to)))",
        "return E_INVARG;"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "MOVED property: 3",
        "MOVED verb: 3"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "MOVED property: 3",
        "MOVED verb: 5"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "eb74299f4f894e10d5ff4a8ee0ddd3bcccf1f7888a361cc73599dc86db256a8f"
    }
  },
  "utility-code-help": {
    "value": "0",
    "output": [
      "HELP database count: 3",
      "EMPTY search: {}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "HELP database count: 3",
        "EMPTY search: {}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "3a83dddea8bb475cf4158377426ef9d46fbc6d14bb2361ae2aa3049ae10220f9"
    }
  },
  "utility-code-dump": {
    "value": "0",
    "output": [
      "dump_preamble source:",
      "\":dump_preamble(object): produces the @create command necessary to dump this object.\";",
      "dobj = args[1];",
      "parent = parent(dobj);",
      "pstring = tostr(parent);",
      "for p in (properties(#0))",
      "if (#0.(p) == parent)",
      "dump_properties source:",
      "\":dump_properties (object, create_flag): returns the list of strings representing the property information for this object and its ancestor objects in @dump format.\";",
      "set_task_perms(caller_perms());",
      "{dobj, create, ?targname = tostr(dobj)} = args;",
      "result = {};",
      "for p in (`properties(dobj) ! ANY => {}')",
      "pquoted = toliteral(p);",
      "dump_verbs source:",
      "\":dump_verbs (object, create_flag): returns the list of strings representing the verb information for this object in @dump format.\";",
      "set_task_perms(caller_perms());",
      "{dobj, create, ?targname = tostr(dobj)} = args;",
      "result = {};",
      "v = 1;",
      "while ((info = `verb_info(dobj, v) ! ANY') || (info == E_PERM))"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "dump_preamble source:",
        "\":dump_preamble(object): produces the @create command necessary to dump this object.\";",
        "dobj = args[1];",
        "parent = parent(dobj);",
        "pstring = tostr(parent);",
        "for p in (properties(#0))",
        "if (#0.(p) == parent)",
        "pstring = \"$\" + p;",
        "endif",
        "endfor",
        "return tostr(\"@create \", pstring, \" named \", dobj.name, \":\", $string_utils:from_list(dobj.aliases, \",\"));",
        "dump_properties source:",
        "\":dump_properties (object, create_flag): returns the list of strings representing the property information for this object and its ancestor objects in @dump format.\";",
        "set_task_perms(caller_perms());",
        "{dobj, create, ?targname = tostr(dobj)} = args;",
        "result = {};",
        "for p in (`properties(dobj) ! ANY => {}')",
        "pquoted = toliteral(p);",
        "try",
        "info = property_info(dobj, p);",
        "value = dobj.(p);",
        "except error (ANY)",
        "result = {@result, tostr(\"\\\"\", targname, \".(\", pquoted, \") => \", toliteral(error[1]), \" (\", error[2], \")\")};",
        "continue p;",
        "dump_verbs source:",
        "\":dump_verbs (object, create_flag): returns the list of strings representing the verb information for this object in @dump format.\";",
        "set_task_perms(caller_perms());",
        "{dobj, create, ?targname = tostr(dobj)} = args;",
        "result = {};",
        "v = 1;",
        "while ((info = `verb_info(dobj, v) ! ANY') || (info == E_PERM))",
        "if (`index(info[3], \"(old)\") ! ANY' && 0)",
        "\"Thought about skipping (old) verbs...\";",
        "player:tell(\"Skipping \", dobj, \":\\\"\", info[3], \"\\\"...\");",
        "else",
        "if (typeof(info) == ERR)",
        "result = {@result, tostr(\"\\\"\", dobj, \":\", v, \" --- \", info, \"\\\";\")};"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "PREAMBLE: @create $thing named Practice:Generic Thing",
        "PROPERTIES:",
        "@prop scratch.\"quantity\" 3 rc",
        ";;scratch.(\"key\") = 0",
        ";;scratch.(\"aliases\") = {\"Generic Thing\"}",
        ";;scratch.(\"object_size\") = {0, 0}",
        "VERBS:"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "PREAMBLE: @create $thing named Practice:Generic Thing",
        "PROPERTIES:",
        "@prop scratch.\"quantity\" 5 rc",
        ";;scratch.(\"key\") = 0",
        ";;scratch.(\"aliases\") = {\"Generic Thing\"}",
        ";;scratch.(\"object_size\") = {0, 0}",
        "VERBS:"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "48d4ea56f66377dceae3d718e1c56f3ce3f866ace47891371df43689f6647688"
    }
  },
  "utility-code-debug-eval": {
    "value": "0",
    "output": [
      "eval_d source:",
      "\":eval_d(code...) => {compiled?,result}\";",
      "\"This works exactly like the builtin eval() except that the code is evaluated \";",
      "\"as if the d flag were unset.\";",
      "code = {\"set_verb_code(this,\\\"eval_d_util\\\",{\\\"\\\\\\\"Do not remove this verb!  This is an auxiliary verb for :eval_d().\\\\\\\";\\\"});\", \"dobj=iobj=this=#-1;\", \"dobjstr=iobjstr=prepstr=argstr=verb=\\\"\\\";\", tostr(\"caller=\", caller, \";\"), \"set_task_perms(caller_perms());\", @args};",
      "if (!caller_perms().programmer)",
      "return E_PERM;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "eval_d source:",
        "\":eval_d(code...) => {compiled?,result}\";",
        "\"This works exactly like the builtin eval() except that the code is evaluated \";",
        "\"as if the d flag were unset.\";",
        "code = {\"set_verb_code(this,\\\"eval_d_util\\\",{\\\"\\\\\\\"Do not remove this verb!  This is an auxiliary verb for :eval_d().\\\\\\\";\\\"});\", \"dobj=iobj=this=#-1;\", \"dobjstr=iobjstr=prepstr=argstr=verb=\\\"\\\";\", tostr(\"caller=\", caller, \";\"), \"set_task_perms(caller_perms());\", @args};",
        "if (!caller_perms().programmer)",
        "return E_PERM;",
        "elseif ((caller_perms() == $no_one) && $no_one:bad_eval(tostr(@args)))",
        "return E_PERM;",
        "elseif (svc = set_verb_code(this, \"eval_d_util\", code))",
        "lines = {};",
        "for line in (svc)",
        "if ((index(line, \"Line \") == 1) && (n = toint(line[6..(colon = index(line + \":\", \":\")) - 1])))"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "EVAL D result: {1, 3}"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "EVAL D result: {1, 5}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "98cb7146e8939566c68a823512e060cf1c7a6c15442ea9d18d423b4bfd1d30d0"
    }
  },
  "utility-code-formatted-stack": {
    "value": "0",
    "output": [
      "callers_text source:",
      "\":callers_text([callers() style list]) - returns the output of the given argument, assumed to be a callers() output. See `help callers()' for details. Will use callers() explicitly if no argument is passed.\";",
      "linelen = min(player:linelen(), 200);",
      "text = {};",
      "su = $string_utils;",
      "lu = $list_utils;",
      "verbwidth = 0;",
      "display_callers source:",
      "\":display_callers([callers() style list]) - displays the output of the given argument, assumed to be a callers() output. See `help callers()' for details. Will use callers() explicitly if no argument is passed.\";",
      "call = (caller_perms() == player) ? \"notify_lines\" | \"tell_lines\";",
      "player:(call)(this:callers_text(@args));"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "callers_text source:",
        "\":callers_text([callers() style list]) - returns the output of the given argument, assumed to be a callers() output. See `help callers()' for details. Will use callers() explicitly if no argument is passed.\";",
        "linelen = min(player:linelen(), 200);",
        "text = {};",
        "su = $string_utils;",
        "lu = $list_utils;",
        "verbwidth = 0;",
        "{?match = callers(1)} = args;",
        "for verbitem in (lu:slice(match, 2))",
        "verbwidth = max(verbwidth, length(verbitem));",
        "endfor",
        "verbwidth = 3 + verbwidth;",
        "numwidth = ((linelen - verbwidth) / 4) - 1;",
        "display_callers source:",
        "\":display_callers([callers() style list]) - displays the output of the given argument, assumed to be a callers() output. See `help callers()' for details. Will use callers() explicitly if no argument is passed.\";",
        "call = (caller_perms() == player) ? \"notify_lines\" | \"tell_lines\";",
        "player:(call)(this:callers_text(@args));"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "FORMATTED stack:",
        "This               Ver Permissions        VerbLocation       Player            ",
        "------------------ --- ------------------ ------------------ ------------------",
        "------------------ --- ------------------ ------------------ ------------------",
        "DISPLAY helper:",
        "This               Ver Permissions        VerbLocation       Player            ",
        "------------------ --- ------------------ ------------------ ------------------",
        "------------------ --- ------------------ ------------------ ------------------"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "FORMATTED stack:",
        "This               Ver Permissions        VerbLocation       Player            ",
        "------------------ --- ------------------ ------------------ ------------------",
        "------------------ --- ------------------ ------------------ ------------------",
        "DISPLAY helper:",
        "This               Ver Permissions        VerbLocation       Player            ",
        "------------------ --- ------------------ ------------------ ------------------",
        "------------------ --- ------------------ ------------------ ------------------"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "b4b25373fc946633d0ed97fe5f24581d3789b7865ee4b50f424f838c502891c1"
    }
  },
  "utility-code-who-report": {
    "value": "0",
    "output": [
      "show_who_listing source:",
      "\":show_who_listing(players[,more_players])\";",
      "\" prints a listing of the indicated players.\";",
      "\" For players in the first list, idle/connected times are shown if the player is logged in, otherwise the last_disconnect_time is shown.  For players in the second list, last_disconnect_time is shown, no matter whether the player is logged in.\";",
      "{plist, ?more_plist = {}} = args;",
      "idles = itimes = offs = otimes = {};",
      "argstr = dobjstr = iobjstr = prepstr = \"\";"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "show_who_listing source:",
        "\":show_who_listing(players[,more_players])\";",
        "\" prints a listing of the indicated players.\";",
        "\" For players in the first list, idle/connected times are shown if the player is logged in, otherwise the last_disconnect_time is shown.  For players in the second list, last_disconnect_time is shown, no matter whether the player is logged in.\";",
        "{plist, ?more_plist = {}} = args;",
        "idles = itimes = offs = otimes = {};",
        "argstr = dobjstr = iobjstr = prepstr = \"\";",
        "for p in (more_plist)",
        "if (!valid(p))",
        "caller:notify(tostr(p, \" <invalid>\"));",
        "elseif (typeof(t = `p.last_disconnect_time ! E_PROPNF') == INT)",
        "if (!(p in offs))",
        "offs = {@offs, p};"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "EMPTY WHO report: 0"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "EMPTY WHO report: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "d8c02ae1ae0d51748c9fc327875265c5acdb13bc609303e56039028235481080"
    }
  },
  "utility-code-reference-report": {
    "value": "0",
    "output": [
      "PARSED: {\"#55\", \"range\"}",
      "CALLABLE: {#55}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "PARSED: {\"#27\", \"union\"}",
        "CALLABLE: {#27}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "813f3a108316538c182d6411fef4c8b2da5738691fa8e308e366e26692defa72"
    }
  },
  "utility-match-ordinal": {
    "value": "0",
    "output": [
      "parse_ordref source:",
      "\":parse_ordref(string)\";",
      "\"Parses strings referring to an 'nth' object.\";",
      "\"=> {INT n, STR object} Where 'n' is the number the ordinal represents, and 'object' is the rest of the string.\";",
      "\"=> 0 If the given string is not an ordinal reference.\";",
      "\"  Example:\";",
      "\":parse_ordref(\\\"second broadsword\\\") => {2, \\\"broadsword\\\"}\";"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "parse_ordref source:",
        "\":parse_ordref(string)\";",
        "\"Parses strings referring to an 'nth' object.\";",
        "\"=> {INT n, STR object} Where 'n' is the number the ordinal represents, and 'object' is the rest of the string.\";",
        "\"=> 0 If the given string is not an ordinal reference.\";",
        "\"  Example:\";",
        "\":parse_ordref(\\\"second broadsword\\\") => {2, \\\"broadsword\\\"}\";",
        "\":parse_ordref(\\\"second\\\") => 0\";",
        "\"  Note that there must be more to the string than the ordinal alone.\";",
        "if (m = match(args[1], (\"^\" + this.ordinal_regexp) + \" +%([^ ].+%)$\"))",
        "o = substitute(\"%1\", m);",
        "n = (o in this.ordn) || (o in this.ordw);",
        "return n && {n, substitute(\"%2\", m)};"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "ORDINAL parts: {2, \"brush\"}",
        "ALIAS parts: {2, \"brush\"}",
        "INCOMPLETE reference: 0"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "ORDINAL parts: {3, \"brush\"}",
        "ALIAS parts: {3, \"brush\"}",
        "INCOMPLETE reference: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "da74287b7be9847b00fde0150f3935928354d1e5649a8b78a38770610d5deb1c"
    }
  },
  "utility-match-lookup-report": {
    "value": "0",
    "output": [
      "parse_ordref source:",
      "\":parse_ordref(string)\";",
      "\"Parses strings referring to an 'nth' object.\";",
      "\"=> {INT n, STR object} Where 'n' is the number the ordinal represents, and 'object' is the rest of the string.\";",
      "\"=> 0 If the given string is not an ordinal reference.\";",
      "\"  Example:\";",
      "\":parse_ordref(\\\"second broadsword\\\") => {2, \\\"broadsword\\\"}\";",
      "match_nth source:",
      "\":match_nth(string, objlist, n)\";",
      "\"Find the nth object in 'objlist' that matches 'string'.\";",
      "{what, where, n} = args;",
      "for v in (where)",
      "z = 0;",
      "for q in (v.aliases)"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "parse_ordref source:",
        "\":parse_ordref(string)\";",
        "\"Parses strings referring to an 'nth' object.\";",
        "\"=> {INT n, STR object} Where 'n' is the number the ordinal represents, and 'object' is the rest of the string.\";",
        "\"=> 0 If the given string is not an ordinal reference.\";",
        "\"  Example:\";",
        "\":parse_ordref(\\\"second broadsword\\\") => {2, \\\"broadsword\\\"}\";",
        "\":parse_ordref(\\\"second\\\") => 0\";",
        "\"  Note that there must be more to the string than the ordinal alone.\";",
        "if (m = match(args[1], (\"^\" + this.ordinal_regexp) + \" +%([^ ].+%)$\"))",
        "o = substitute(\"%1\", m);",
        "n = (o in this.ordn) || (o in this.ordw);",
        "return n && {n, substitute(\"%2\", m)};",
        "match_nth source:",
        "\":match_nth(string, objlist, n)\";",
        "\"Find the nth object in 'objlist' that matches 'string'.\";",
        "{what, where, n} = args;",
        "for v in (where)",
        "z = 0;",
        "for q in (v.aliases)",
        "z = z || (index(q, what) == 1);",
        "endfor",
        "if (z && (!(n = n - 1)))",
        "return v;",
        "endif",
        "endfor"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "PARSED request: {2, \"brush\"}",
        "LOOKUP result: #-3"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "PARSED request: {3, \"brush\"}",
        "LOOKUP result: #-3"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "062a1aa13d3594db9613aeeafac141350927a9dd0915d1ad1df5eb08d809c61b"
    }
  },
  "utility-object-property": {
    "value": "0",
    "output": [
      "HAS inherited: 1",
      "DEFINES on child: 0",
      "READABLE: 1",
      "ANY own properties: 0"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "HAS inherited: 1",
        "DEFINES on child: 0",
        "READABLE: 1",
        "ANY own properties: 0"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "57abd3a651408291b1a47a32abceb490bc6a436dbb6135c6711f68ba81dcfeda"
    }
  },
  "utility-object-inheritance": {
    "value": "0",
    "output": [
      "ISA child root: 1",
      "ANCESTOR count: 1",
      "DESCENDANT count: 1",
      "ORDERED including root: 2",
      "ISONEOF: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ISA child root: 0",
        "ANCESTOR count: 1",
        "DESCENDANT count: 1",
        "ORDERED including root: 2",
        "ISONEOF: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "425e0fc8d420135e4e71dd6da35fa658c4a2000b25aa08bf4afcd489b073fdc6"
    }
  },
  "utility-object-tree-ends": {
    "value": "0",
    "output": [
      "LEAVES count: 1",
      "BRANCHES count: 1",
      "DESCENDANTS suspended: 1",
      "LEAVES suspended: 1",
      "BRANCHES suspended: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "LEAVES count: 1",
        "BRANCHES count: 1",
        "DESCENDANTS suspended: 1",
        "LEAVES suspended: 1",
        "BRANCHES suspended: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "6f59e84740cc80e29412b7a7e768b12dc4539a5a6a4541935c1ba009bd9abf04"
    }
  },
  "utility-object-enumeration": {
    "value": "0",
    "output": [
      "ALL properties: {\"sample\"}",
      "ALL properties suspended: {\"sample\"}",
      "ALL verbs: {}",
      "ALL verbs suspended: {}",
      "FINDABLE: {\"sample\"}",
      "OWNED: {\"sample\"}",
      "ACCESSIBLE properties: {\"sample\"}",
      "ACCESSIBLE verbs: {}"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "ALL properties: {\"quantity\"}",
        "ALL properties suspended: {\"quantity\"}",
        "ALL verbs: {}",
        "ALL verbs suspended: {}",
        "FINDABLE: {\"quantity\"}",
        "OWNED: {\"quantity\"}",
        "ACCESSIBLE properties: {\"quantity\"}",
        "ACCESSIBLE verbs: {}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "8b16d35ad35068a7fcfa3d036631ab4fe46c50bb3964bc31036a91ce861e6d7e"
    }
  },
  "utility-object-reparenting": {
    "value": "0",
    "output": [
      "CONFLICT count: 1",
      "DEFINITION locations count: 1"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "CONFLICT count: 0",
        "DEFINITION locations count: 1"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "97676b21909920a3d7bab22056d452a2b464e854c569ec61320497457fe3e930"
    }
  },
  "utility-list-parallel": {
    "value": "0",
    "output": [
      "build_alist source:",
      "\"Syntax:  build_alist(list, N) =>\";",
      "\"{list[1..N], list[N+1..N*2], list[N*2+1..N*3], ..., list[N*(N-1)+1..N*N]}\";",
      "\"\";",
      "\"Creates an associated list from a flat list at every Nth interval. If the list doesn't have a multiple of N elements, E_RANGE is returned.\";",
      "\"Example:  build_alist({a,b,c,d,e,f,g,h,i},3)=>{{a,b,c},{d,e,f},{g,h,i}}\";",
      "{olist, interval} = args;",
      "passoc source:",
      "\"passoc(key,list1,list2)\";",
      "\"passoc() behaves rather similarly to assoc, with the exception that it's intended for\";",
      "\"parallel lists.  given a key from list1, it returns a list containing the key and the\";",
      "\"corresponding item from list2 (\\\"corresponding\\\", in the case of parallel lists, means\";",
      "\"having the same index.)\";",
      "indx = args[1] in args[2];",
      "make_alist source:",
      "\":make_alist(lists[, pad])\";",
      "\"Make an alist out of n parallel lists (basically a matrix transpose).\";",
      "\"If the lists are of uneven length, fill the remaining tuples with pad (defaults to 0).\";",
      "alist = {};",
      "pad = (length(args) > 1) ? args[2] | 0;",
      "for i in [1..$list_utils:max_length(args[1])]"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "build_alist source:",
        "\"Syntax:  build_alist(list, N) =>\";",
        "\"{list[1..N], list[N+1..N*2], list[N*2+1..N*3], ..., list[N*(N-1)+1..N*N]}\";",
        "\"\";",
        "\"Creates an associated list from a flat list at every Nth interval. If the list doesn't have a multiple of N elements, E_RANGE is returned.\";",
        "\"Example:  build_alist({a,b,c,d,e,f,g,h,i},3)=>{{a,b,c},{d,e,f},{g,h,i}}\";",
        "{olist, interval} = args;",
        "if ((tot = length(olist)) % interval)",
        "return E_RANGE;",
        "endif",
        "nlist = {};",
        "d = 1;",
        "while (d <= tot)",
        "passoc source:",
        "\"passoc(key,list1,list2)\";",
        "\"passoc() behaves rather similarly to assoc, with the exception that it's intended for\";",
        "\"parallel lists.  given a key from list1, it returns a list containing the key and the\";",
        "\"corresponding item from list2 (\\\"corresponding\\\", in the case of parallel lists, means\";",
        "\"having the same index.)\";",
        "indx = args[1] in args[2];",
        "if (indx)",
        "return {args[1], args[3][indx]};",
        "else",
        "return {};",
        "endif",
        "make_alist source:",
        "\":make_alist(lists[, pad])\";",
        "\"Make an alist out of n parallel lists (basically a matrix transpose).\";",
        "\"If the lists are of uneven length, fill the remaining tuples with pad (defaults to 0).\";",
        "alist = {};",
        "pad = (length(args) > 1) ? args[2] | 0;",
        "for i in [1..$list_utils:max_length(args[1])]",
        "tuple = {};",
        "for l in (args[1])",
        "tuple = {@tuple, (i > length(l)) ? pad | l[i]};",
        "endfor",
        "alist = {@alist, tuple};",
        "endfor"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "BUILD_ALIST pairs: {{\"brush\", 3}, {\"saw\", 2}}",
        "PASSOC parallel lookup: {\"saw\", 2}",
        "MAKE_ALIST records: {{\"brush\", 3}, {\"saw\", 2}}"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "BUILD_ALIST pairs: {{\"brush\", 3}, {\"saw\", 2}}",
        "PASSOC parallel lookup: {\"brush\", 3}",
        "MAKE_ALIST records: {{\"brush\", 3}, {\"saw\", 2}}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "2c963ca39423468354691a3d73b37929f9bc782edabfa4d7b1d0c4242c3756be"
    }
  },
  "utility-wiz-rename-verbs": {
    "value": "0",
    "output": [
      "rename_all_instances source:",
      "\":rename_all_instances(object,oldname,newname)\";",
      "\"Used to rename all instances of an unwanted verb (like recycle or disfunc)\";",
      "\"if said verb is actually defined on the object itself\";",
      "if (caller_perms().wizard)",
      "found = 0;",
      "{object, oldname, newname} = args;"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "rename_all_instances source:",
        "\":rename_all_instances(object,oldname,newname)\";",
        "\"Used to rename all instances of an unwanted verb (like recycle or disfunc)\";",
        "\"if said verb is actually defined on the object itself\";",
        "if (caller_perms().wizard)",
        "found = 0;",
        "{object, oldname, newname} = args;",
        "while (info = `verb_info(object, oldname) ! ANY')",
        "`set_verb_info(object, oldname, listset(info, newname, 3)) ! ANY';",
        "found = 1;",
        "endwhile",
        "return found;",
        "else"
      ]
    },
    "server": {
      "value": "0",
      "output": [
        "RENAME result: 0",
        "VERBS after: {\"oldname\"}"
      ]
    },
    "serverExperiment": {
      "value": "0",
      "output": [
        "RENAME result: 0",
        "VERBS after: {\"oldname\"}"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "92ca53e2e1e9bf6985b3750b5911820f20174a8cc66fc119eb0560e61a7c4b57"
    }
  },
  "utility-wiz-help-report": {
    "value": "0",
    "output": [
      "show_missing_help source:",
      "mhs = this.missed_help_strings;",
      "cnt = this.missed_help_counters;",
      "\"save values first, so subsequent changes during suspends wont affect it\";",
      "thresh = args ? args[1] | 5;",
      "strs = {};",
      "for i in [1..length(mhs)]"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "show_missing_help source:",
        "mhs = this.missed_help_strings;",
        "cnt = this.missed_help_counters;",
        "\"save values first, so subsequent changes during suspends wont affect it\";",
        "thresh = args ? args[1] | 5;",
        "strs = {};",
        "for i in [1..length(mhs)]",
        "$command_utils:suspend_if_needed(0);",
        "if ((cnt[i][1] + cnt[i][2]) > thresh)",
        "strs = {@strs, ((($string_utils:right(tostr(cnt[i][1]), 5) + \" \") + $string_utils:right(tostr(cnt[i][2]), 5)) + \" \") + mhs[i]};",
        "endif",
        "endfor",
        "sorted = $list_utils:sort_suspended(0, strs);"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "e75f0f0632bcad27a385f32ce18a7c73490b785c8bb58fdff256746eeb748bae"
    }
  },
  "utility-list-yielding": {
    "value": "0",
    "output": [
      "sort_suspended source:",
      "\":sort_suspended(interval,list[,keys]) => sorts keys (assumed to be all numbers or strings) and returns list with the corresponding permutation applied to it.  keys defaults to the list itself.\";",
      "\"Note: For compatibility with LambdaCore, the interval argument hasn't been removed. In ToastStunt, however, it's not used. Instead, the task will suspend until the sort thread has finished.\";",
      "set_task_perms(caller_perms());",
      "return sort(@args[2..$]);",
      "assoc_suspended source:",
      "\"Copied from Moo_tilities (#332):assoc_suspended by Mooshie (#106469) Wed Mar 18 19:27:54 1998 PST\";",
      "\"Usage: assoc_suspended(ANY target, LIST list [, INT index [, INT suspend-for ])) => Returns the first element of `list' whose own index-th element is target.  Index defaults to 1.\";",
      "\"Returns {} if no such element is found.\";",
      "\"Suspends as necessary. Suspend length defaults to 0.\";",
      "set_task_perms(caller_perms());",
      "{target, thelist, ?indx = 1, ?suspend_for = 0} = args;",
      "iassoc_suspended source:",
      "\"Copied from Moo_tilities (#332):iassoc_suspended by Mooshie (#106469) Wed Mar 18 19:27:53 1998 PST\";",
      "\"Usage: iassoc_suspended(ANY target, LIST list [, INT index [, INT suspend-for ]]) => Returns the index of the first element of `list' whose own index-th element is target. Index defaults to 1.\";",
      "\"Returns 0 if no such element is found.\";",
      "\"Suspends as needed. Suspend length defaults to 0.\";",
      "set_task_perms(caller_perms());",
      "{target, thelist, ?indx = 1, ?suspend_for = 0} = args;",
      "reverse_suspended source:",
      "\"reverse(list) => reversed list.  Does suspend(0) as necessary.\";",
      "set_task_perms(caller_perms());",
      "\"^^^For suspend task.\";",
      "return this:_reverse_suspended(@args[1]);",
      "flatten_suspended source:",
      "\"Copied from list utilities (#372):flatten [verb author Hacker (#18105)] at Sun Jul  3 07:46:47 2011 PDT\";",
      "\"Copied from $quinn_utils (#34283):unroll by Quinn (#19845) Mon Mar  8 09:29:03 1993 PST\";",
      "\":flatten(LIST list_of_lists) => LIST of all lists in given list `flattened'\";",
      "newlist = {};",
      "for elm in (args[1])",
      "if (typeof(elm) == LIST)"
    ],
    "experiment": {
      "value": "0",
      "output": [
        "sort_suspended source:",
        "\":sort_suspended(interval,list[,keys]) => sorts keys (assumed to be all numbers or strings) and returns list with the corresponding permutation applied to it.  keys defaults to the list itself.\";",
        "\"Note: For compatibility with LambdaCore, the interval argument hasn't been removed. In ToastStunt, however, it's not used. Instead, the task will suspend until the sort thread has finished.\";",
        "set_task_perms(caller_perms());",
        "return sort(@args[2..$]);",
        "assoc_suspended source:",
        "\"Copied from Moo_tilities (#332):assoc_suspended by Mooshie (#106469) Wed Mar 18 19:27:54 1998 PST\";",
        "\"Usage: assoc_suspended(ANY target, LIST list [, INT index [, INT suspend-for ])) => Returns the first element of `list' whose own index-th element is target.  Index defaults to 1.\";",
        "\"Returns {} if no such element is found.\";",
        "\"Suspends as necessary. Suspend length defaults to 0.\";",
        "set_task_perms(caller_perms());",
        "{target, thelist, ?indx = 1, ?suspend_for = 0} = args;",
        "cu = $command_utils;",
        "for t in (thelist)",
        "if (`t[indx] == target ! E_TYPE => 0')",
        "if ((typeof(t) == LIST) && (length(t) >= indx))",
        "return t;",
        "endif",
        "iassoc_suspended source:",
        "\"Copied from Moo_tilities (#332):iassoc_suspended by Mooshie (#106469) Wed Mar 18 19:27:53 1998 PST\";",
        "\"Usage: iassoc_suspended(ANY target, LIST list [, INT index [, INT suspend-for ]]) => Returns the index of the first element of `list' whose own index-th element is target. Index defaults to 1.\";",
        "\"Returns 0 if no such element is found.\";",
        "\"Suspends as needed. Suspend length defaults to 0.\";",
        "set_task_perms(caller_perms());",
        "{target, thelist, ?indx = 1, ?suspend_for = 0} = args;",
        "cu = $command_utils;",
        "for element in (thelist)",
        "if (`element[indx] == target ! E_RANGE, E_TYPE => 0' && (typeof(element) == LIST))",
        "return element in thelist;",
        "endif",
        "cu:suspend_if_needed(suspend_for);",
        "reverse_suspended source:",
        "\"reverse(list) => reversed list.  Does suspend(0) as necessary.\";",
        "set_task_perms(caller_perms());",
        "\"^^^For suspend task.\";",
        "return this:_reverse_suspended(@args[1]);",
        "flatten_suspended source:",
        "\"Copied from list utilities (#372):flatten [verb author Hacker (#18105)] at Sun Jul  3 07:46:47 2011 PDT\";",
        "\"Copied from $quinn_utils (#34283):unroll by Quinn (#19845) Mon Mar  8 09:29:03 1993 PST\";",
        "\":flatten(LIST list_of_lists) => LIST of all lists in given list `flattened'\";",
        "newlist = {};",
        "for elm in (args[1])",
        "if (typeof(elm) == LIST)",
        "$command_utils:suspend_if_needed(0);",
        "newlist = {@newlist, @this:flatten_suspended(elm)};",
        "else",
        "$command_utils:suspend_if_needed(0);",
        "newlist = {@newlist, elm};",
        "endif"
      ]
    },
    "provenance": {
      "databaseSha256": "75d074db6353f2e9833097072f5e59a117cd2147c43ae9b176f7992b913824d7",
      "fixtureSha256": "c3bd24e450fcec6212055af051073644157293098cfa7286fbd13c2451398518",
      "runtimeSha256": "1f994f7abaec558b2f4e1f3bc2429467224578cccb20c2ec18f9e020afdd4216",
      "binarySha256": "d344894361a7f004b9b57c79a957931469f7255e3b569a2ac193b3902f2a6dcb",
      "lessonSha256": "c83c02477f4fecab380fb59214f131e5bc8d503895ab7f30da3894df0adb808b"
    }
  }
};
