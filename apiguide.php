<?php

return [
    [
        'title' => 'Authentication',
        'value' => [
            [
                'title' => 'Login',
                'method' => 'post',
                'route' => '/api/login',
                'request' => [
                    'curl' => "curl -X POST \n {{base_url}}/api/login \n -d 'email=your-email@example.com' \n -d 'password=your-password' \n -H 'Content-Type: application/json'",
                    'php' => "<?php\n\$client = new Client();\n\$request = new Request('POST', '{{base_url}}/api/login', [\n    'json' => [\n        'email' => 'your-email@example.com',\n        'password' => 'your-password'\n    ]\n]);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\n\n// Use \$responseBody as needed\n",
                    'nodejs' => "var axios = require('axios');\n\nvar data = {\n  email: 'your-email@example.com',\n  password: 'your-password'\n};\n\nvar config = {\n  method: 'post',\n  url: '{{base_url}}/api/login',\n  headers: { 'Content-Type': 'application/json' },\n  data: data\n};\n\naxios(config)\n.then(function (response) {\n  console.log(response.data);\n})\n.catch(function (error) {\n  console.log(error);\n});",
                    'python' => "import requests\n\nurl = \"{{base_url}}/api/login\"\n\ndata = {\n    'email': 'your-email@example.com',\n    'password': 'your-password'\n}\n\nheaders = {\n    'Content-Type': 'application/json'\n}\n\nresponse = requests.post(url, json=data, headers=headers)\n\nprint(response.json())",
                    'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nString json = \"{\\\"email\\\": \\\"your-email@example.com\\\", \\\"password\\\": \\\"your-password\\\"}\";\nRequestBody body = RequestBody.create(mediaType, json);\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/login\")\n  .method(\"POST\", body)\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
                    'ruby' => "require 'uri'\nrequire 'net/http'\nrequire 'json'\n\nurl = URI(\"{{base_url}}/api/login\")\n\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Content-Type'] = 'application/json'\nrequest.body = JSON.dump({\n  'email' => 'your-email@example.com',\n  'password' => 'your-password'\n})\n\nresponse = http.request(request)\nputs response.read_body",
                ]
            ]
        ],
    ],
    [
      'title' => 'contacts',
      'value' => [
          [
              'title' => 'Get specific contact by UUID',
              'method' => 'get',
              'route' => '/api/contacts/{uuid}',
              'request' => [
                  'curl' => "curl -X GET \n {{base_url}}/api/contacts/{uuid} \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
                  'php' => "<?php\n\$client = new Client();\n\$request = new Request('GET', '{{base_url}}/api/contacts/{uuid}');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\n\n// Use \$responseBody as needed\n",
                  'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contacts/{uuid}',\n  headers: { }\n};\n\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
                  'python' => "import requests\n\nurl = \"{{base_url}}/api/contacts/{uuid}\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"GET\", url, headers=headers, data=payload)\n\nprint(response.text)",
                  'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts/{uuid}\")\n  .method(\"GET\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
                  'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contacts/{uuid}\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Get.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
              ]
          ],
        [
          'title' => 'Get contact list',
          'method' => 'get',
          'route' => '/api/contacts',
          'request' => [
              'curl' => "curl -X GET \n {{base_url}}/api/contacts \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('GET', '{{base_url}}/api/contacts');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\n\n// Use \$responseBody as needed\n",
              'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contacts',\n  headers: { }\n};\n\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contacts\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"GET\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts\")\n  .method(\"GET\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contacts\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Get.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Add contact',
          'method' => 'post',
          'route' => '/api/contacts',
          'request' => [
              'curl' => "curl -X POST \n {{base_url}}/api/contacts \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@gmail.com\",\n    \"phone\": \"+1 (968) 082-5846\"\n}';\n\$request = new Request('POST', '{{base_url}}/api/contacts', [], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@gmail.com\",\n    \"phone\": \"+1 (968) 082-5846\"\n}';\n\nvar config = {\n  method: 'post',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contacts',\n  headers: { },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contacts\"\n\npayload = \"{\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@gmail.com\",\n    \"phone\": \"+1 (968) 082-5846\"\n}\"\nheaders = {}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@gmail.com\",\n    \"phone\": \"+1 (968) 082-5846\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts\")\n  .method(\"POST\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contacts\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Post.new(url)\nrequest.body = \"{\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@gmail.com\",\n    \"phone\": \"+1 (968) 082-5846\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Edit contact',
          'method' => 'put',
          'route' => '/api/contacts/{uuid}',
          'request' => [
              'curl' => "curl -X PUT \n {{base_url}}/api/contacts/{uuid} \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$headers = [\n  'Content-Type' => 'application/json'\n];\n\$body = '{\n  \"first_name\": \"John\",\n  \"last_name\": \"Doe\",\n  \"email\": \"johndoe@gmail.com\",\n  \"phone\": \"+1 (968) 082-5846\"\n}';\n\$request = new Request('PUT', '{{base_url}}/api/contacts/{{uuid}}', \$headers, \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = JSON.stringify({\n  \"first_name\": \"John\",\n  \"last_name\": \"Doe\",\n  \"email\": \"johndoe@gmail.com\",\n  \"phone\": \"+1 (968) 082-5846\"\n});\n\nvar config = {\n  method: 'put',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contacts/{{uuid}}',\n  headers: { \n    'Content-Type': 'application/json'\n  },\n  data : data\n};\n\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
              'python' => "import requests\nimport json\n\nurl = \"{{base_url}}/api/contacts/{{uuid}}\"\n\npayload = json.dumps({\n  \"first_name\": \"John\",\n  \"last_name\": \"Doe\",\n  \"email\": \"johndoe@gmail.com\",\n  \"phone\": \"+1 (968) 082-5846\"\n})\nheaders = {\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.request(\"PUT\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@gmail.com\",\n    \"phone\": \"+1 (968) 082-5846\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts/{{uuid}}\")\n  .method(\"PUT\", body)\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contacts/{{uuid}}\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Put.new(url)\nrequest.body = \"{\n    \"first_name\": \"John\",\n    \"last_name\": \"Doe\",\n    \"email\": \"johndoe@gmail.com\",\n    \"phone\": \"+1 (968) 082-5846\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Delete contact',
          'method' => 'del',
          'route' => '/api/contacts/{uuid}',
          'request' => [
              'curl' => "curl -X DELETE \n {{base_url}}/api/contacts/{uuid} \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('DELETE', '{{base_url}}/api/contacts/{{uuid}}');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'delete',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contacts/{{uuid}}',\n  headers: { }\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contacts/{{uuid}}\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"DELETE\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts/{{uuid}}\")\n  .method(\"DELETE\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contacts/945d8b4f-a580-4743-bdfa-f0095059b37a\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Delete.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Search contacts',
          'method' => 'post',
          'route' => '/api/contacts/search',
          'request' => [
              'curl' => "curl -X POST \n {{base_url}}/api/contacts/search \n -d 'search=John' \n -d 'page=1' \n -d 'per_page=10' \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('POST', '{{base_url}}/api/contacts/search', [\n    'json' => [\n        'search' => 'John',\n        'page' => 1,\n        'per_page' => 10\n    ]\n]);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\n\n// Use \$responseBody as needed\n",
              'nodejs' => "var axios = require('axios');\n\nvar data = {\n  search: 'John',\n  page: 1,\n  per_page: 10\n};\n\nvar config = {\n  method: 'post',\n  url: '{{base_url}}/api/contacts/search',\n  headers: { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' },\n  data: data\n};\n\naxios(config)\n.then(function (response) {\n  console.log(response.data);\n})\n.catch(function (error) {\n  console.log(error);\n});",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contacts/search\"\n\ndata = {\n    'search': 'John',\n    'page': 1,\n    'per_page': 10\n}\n\nheaders = {\n    'Authorization': 'Bearer your-bearer-token',\n    'Content-Type': 'application/json'\n}\n\nresponse = requests.post(url, json=data, headers=headers)\n\nprint(response.json())",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nString json = \"{\\\"search\\\": \\\"John\\\", \\\"page\\\": 1, \\\"per_page\\\": 10}\";\nRequestBody body = RequestBody.create(mediaType, json);\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts/search\")\n  .method(\"POST\", body)\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require 'uri'\nrequire 'net/http'\nrequire 'json'\n\nurl = URI(\"{{base_url}}/api/contacts/search\")\n\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nrequest['Content-Type'] = 'application/json'\nrequest.body = JSON.dump({\n  'search' => 'John',\n  'page' => 1,\n  'per_page' => 10\n})\n\nresponse = http.request(request)\nputs response.read_body",
          ],
          'notes' => 'Searches contacts by first_name, last_name, or phone. Respects ticket assignment and team role logic. Returns only matching contacts. Parameters: search (required), page (optional), per_page (optional).',
        ],
        [
          'title' => 'Get contacts with last chats and chatsCount',
          'method' => 'post',
          'route' => '/api/contacts/with-last-chats',
          'request' => [
              'curl' => "curl -X POST \n {{base_url}}/api/contacts/with-last-chats \n -d 'organization=ORG_ID' -d 'status=all' -d 'search=John' -d 'page=1' -d 'per_page=10' \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('POST', '{{base_url}}/api/contacts/with-last-chats', [\n    'json' => [\n        'organization' => 'ORG_ID',\n        'status' => 'all',\n        'search' => 'John',\n        'page' => 1,\n        'per_page' => 10\n    ]\n]);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\n// Use \$responseBody as needed\n",
              'nodejs' => "var axios = require('axios');\nvar data = { organization: 'ORG_ID', status: 'all', search: 'John', page: 1, per_page: 10 };\nvar config = { method: 'post', url: '{{base_url}}/api/contacts/with-last-chats', headers: { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' }, data: data };\naxios(config)\n.then(function (response) {\n  console.log(response.data);\n})\n.catch(function (error) {\n  console.log(error);\n});",
              'python' => "import requests\nurl = \"{{base_url}}/api/contacts/with-last-chats\"\ndata = { 'organization': 'ORG_ID', 'status': 'all', 'search': 'John', 'page': 1, 'per_page': 10 }\nheaders = { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' }\nresponse = requests.post(url, json=data, headers=headers)\nprint(response.json())",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nString json = \"{\\\"organization\\\": \\\"ORG_ID\\\", \\\"status\\\": \\\"all\\\", \\\"search\\\": \\\"John\\\", \\\"page\\\": 1, \\\"per_page\\\": 10}\";\nRequestBody body = RequestBody.create(mediaType, json);\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts/with-last-chats\")\n  .method(\"POST\", body)\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require 'uri'\nrequire 'net/http'\nrequire 'json'\nurl = URI(\"{{base_url}}/api/contacts/with-last-chats\")\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nrequest['Content-Type'] = 'application/json'\nrequest.body = JSON.dump({ 'organization' => 'ORG_ID', 'status' => 'all', 'search' => 'John', 'page' => 1, 'per_page' => 10 })\nresponse = http.request(request)\nputs response.read_body",
          ],
          'notes' => "Returns paginated contacts that have a lastChat record and includes a chatsCount field for each contact.\nParameters: organization (required), status (optional: all, unassigned, open, closed), search (optional: string, searches first_name, last_name, phone), page (optional), per_page (optional).\n- status=all: returns all contacts with a lastChat.\n- status=unassigned/open/closed: filters contacts by ticket assignment/status, respecting team role logic.\n- search: if provided, filters contacts by first_name, last_name, or phone.\n- contactGroups: each contact includes an array of groups (tags) it belongs to.\nPagination meta is included in the response.",
        ],
      ],
    ],
    [
      'title' => 'Contact groups',
      'value' => [
        [
          'title' => 'Get contact group list',
          'method' => 'get',
          'route' => '/api/contact-groups',
          'request' => [
              'curl' => "curl -X GET \n {{base_url}}/api/contact-groups \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('GET', '{{base_url}}/api/contact-groups');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contact-groups',\n  headers: { }\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contact-groups\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"GET\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contact-groups\")\n  .method(\"GET\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contact-groups\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Get.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Add contact group',
          'method' => 'post',
          'route' => '/api/contact-groups',
          'request' => [
              'curl' => "curl -X POST \n {{base_url}}/api/contact-groups \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"name\":\"Lead 4\"\n}';\n\$request = new Request('POST', '{{base_url}}/api/contact-groups', [], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"name\":\"Lead 5\"\n}';\n\nvar config = {\n  method: 'post',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contact-groups',\n  headers: { },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contact-groups\"\n\npayload = \"{\n    \"name\":\"Lead 5\"\n}\"\nheaders = {}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"name\":\"Lead 5\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contact-groups\")\n  .method(\"POST\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contact-groups\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Post.new(url)\nrequest.body = \"{\n    \"name\":\"Lead 5\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Edit contact group',
          'method' => 'put',
          'route' => '/api/contact-groups/{uuid}',
          'request' => [
              'curl' => "curl -X PUT \n {{base_url}}/api/contact-groups/{uuid} \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"name\":\"Lead 5\"\n}';\n\$request = new Request('PUT', '{{base_url}}/api/contact-groups/{{uuid}}', [], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"name\":\"Lead 5\"\n}';\n\nvar config = {\n  method: 'put',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contact-groups/{{id}}',\n  headers: { },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contact-groups/{{id}}\"\n\npayload = \"{\n    \"name\":\"Lead 5\"\n}\"\nheaders = {}\n\nresponse = requests.request(\"PUT\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"name\":\"Lead 5\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contact-groups/{{id}}\")\n  .method(\"PUT\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contact-groups/{{id}}\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Put.new(url)\nrequest.body = \"{\n    \"name\":\"Lead 5\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Delete contact group',
          'method' => 'del',
          'route' => '/api/contact-groups/{uuid}',
          'request' => [
              'curl' => "curl -X DELETE \n {{base_url}}/api/contact-groups/{uuid} \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('DELETE', '{{base_url}}/api/contact-groups/{{uuid}}');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'delete',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contact-groups/{{id}}',\n  headers: { }\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/contact-groups/{{id}}\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"DELETE\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contact-groups/{{id}}\")\n  .method(\"DELETE\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/contact-groups/{{id}}\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Delete.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
      ],
    ],
    [
      'title' => 'Automated replies',
      'value' => [
        [
          'title' => 'Get automated replies list',
          'method' => 'get',
          'route' => '/api/canned-replies',
          'request' => [
              'curl' => "curl -X GET \n {{base_url}}/api/canned-replies \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('GET', '{{base_url}}/api/canned-replies');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/canned-replies',\n  headers: { }\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/canned-replies\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"GET\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/canned-replies\")\n  .method(\"GET\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/canned-replies\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Get.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Add automated reply',
          'method' => 'post',
          'route' => '/api/canned-replies',
          'request' => [
              'curl' => "curl -X POST \n {{base_url}}/api/canned-replies \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes\"\n}';\n\$request = new Request('POST', '{{base_url}}/api/canned-replies', [], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes\"\n}';\n\nvar config = {\n  method: 'post',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/canned-replies',\n  headers: { },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/canned-replies\"\n\npayload = \"{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes\"\n}\"\nheaders = {}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/canned-replies\")\n  .method(\"POST\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/canned-replies\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Post.new(url)\nrequest.body = \"{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Edit automated reply',
          'method' => 'put',
          'route' => '/api/canned-replies/{uuid}',
          'request' => [
              'curl' => "curl -X PUT \n {{base_url}}/api/canned-replies/{uuid} \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes and clothes\"\n}';\n\$request = new Request('PUT', '{{base_url}}/api/canned-replies/{{uuid}}', [], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes and clothes\"\n}';\n\nvar config = {\n  method: 'put',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/canned-replies/{{uuid}}',\n  headers: { },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/canned-replies/{{id}}\"\n\npayload = \"{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes and clothes\"\n}\"\nheaders = {}\n\nresponse = requests.request(\"PUT\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes and clothes\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/canned-replies/{{id}}\")\n  .method(\"PUT\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/canned-replies/{{id}}\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Put.new(url)\nrequest.body = \"{\n    \"name\":\"About Us\",\n    \"trigger\": \"what do you do?\",\n    \"match_criteria\": \"contains\",\n    \"response_type\": \"text\",\n    \"response\": \"We sell shoes and clothes\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Delete automated reply',
          'method' => 'del',
          'route' => '/api/canned-replies/{uuid}',
          'request' => [
              'curl' => "curl -X DELETE \n {{base_url}}/api/canned-replies/{uuid} \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('DELETE', '{{base_url}}/api/canned-replies/{{uuid}}');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'delete',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/canned-replies/{{id}}',\n  headers: { }\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/canned-replies/{{id}}\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"DELETE\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/canned-replies/{{id}}\")\n  .method(\"DELETE\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/canned-replies/{{id}}\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Delete.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
      ],
    ],
    [
      'title' => 'Messages',
      'value' => [
        [
          'title' => 'Send message',
          'method' => 'post',
          'route' => '/api/send',
          'request' => [
              'curl' => "curl -X POST \n{{base_url}}/api/send \n-H 'Authorization: Bearer <YOUR_AUTHORIZATION_TOKEN>' \n-H 'Content-Type: application/json' \n-d '{\n\t\"phone\": \"+1 (968) 082-5846\",\n\t\"message\": \"Hello John, how are you?\",\n\t\"header\": \"Test header\",\n\t\"footer\": \"Test footer\",\n\t\"buttons\": [\n\t\t{\n\t\t\t\"id\": \"id_1\", \n\t\t\t \"title\": \"Fine\"\n\t\t},\n\t\t{\n\t\t\t\"id\": \"id_2\", \n\t\t\t\"title\": \"Not well\"\n\t\t}\n\t]\n}'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"message\": \"Hello John, how are you?\"\n}';\n\$request = new Request('POST', '{{base_url}}/api/send', [], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"message\": \"Hello John, how are you?\"\n}';\n\nvar config = {\n  method: 'post',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/send',\n  headers: { },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/send\"\n\npayload = \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"message\": \"Hello John, how are you?\"\n}\"\nheaders = {}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"message\": \"Hello John, how are you?\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/send\")\n  .method(\"POST\", body)\n  .addHeader(\"Authorization\", \"Bearer <YOUR_AUTHORIZATION_TOKEN>\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/send\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Post.new(url)\nrequest.body = \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"message\": \"Hello John, how are you?\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Send media',
          'method' => 'post',
          'route' => '/api/send/media',
          'request' => [  
              'curl' => "curl -X POST \n{{base_url}}/api/send/media \n-H 'Authorization: Bearer <YOUR_AUTHORIZATION_TOKEN>' \n-H 'Content-Type: application/json' \n-d '{\n\t\"phone\": \"+1 (968) 082-5846\",\n\t\"media_type\": \"image\",\n\t\"media_url\": \"https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\n\t\"caption\": \"your caption for image or video media types\",\n\t\"file_name\": \"testFileName\"\n}'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"media_type\": \"image\",\n    \"media_url\": \"https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\n    \"caption\": \"your caption for image or video media types\",\n    \"file_name\": \"testFileName\"\n}';\n\$request = new Request('POST', '{{base_url}}/api/send/media', [\n    'Authorization' => 'Bearer <YOUR_AUTHORIZATION_TOKEN>',\n    'Content-Type' => 'application/json',\n], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody()->getContents();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"media_type\": \"image\",\n    \"media_url\": \"https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\n    \"caption\": \"your caption for image or video media types\",\n    \"file_name\": \"testFileName\"\n}';\n\nvar config = {\n  method: 'post',\n  url: '{{base_url}}/api/send/media',\n  headers: {\n    'Authorization': 'Bearer <YOUR_AUTHORIZATION_TOKEN>',\n    'Content-Type': 'application/json'\n  },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/send/media\"\n\npayload = \"{\n\t\"phone\": \"+1 (968) 082-5846\",\n    \"media_type\": \"image\",\n    \"media_url\": \"https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\n    \"caption\": \"your caption for image or video media types\",\n    \"file_name\": \"testFileName\"\n}\"\nheaders = {\n  'Authorization': 'Bearer <YOUR_AUTHORIZATION_TOKEN>',\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"media_type\": \"image\",\n    \"media_url\": \"https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\n    \"caption\": \"your caption for image or video media types\",\n    \"file_name\": \"testFileName\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/send/media\")\n  .method(\"POST\", body)\n  .addHeader(\"Authorization\", \"Bearer <YOUR_AUTHORIZATION_TOKEN>\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/send/media\")\n\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer <YOUR_AUTHORIZATION_TOKEN>'\nrequest['Content-Type'] = 'application/json'\nrequest.body = \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"media_type\": \"image\",\n    \"media_url\": \"https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\n    \"caption\": \"your caption for image or video media types\",\n    \"file_name\": \"testFileName\"\n}\"\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Send template message',
          'method' => 'post',
          'route' => '/api/send/template',
          'request' => [
              'curl' => "curl -X POST \n{{base_url}}/api/send/template \n-H 'Authorization: Bearer <YOUR_AUTHORIZATION_TOKEN>' \n-H 'Content-Type: application/json' \n-d '{\n\t\"phone\": \"+1 (968) 082-5846\",\n\t\"template\": {\n\t\t\"name\": \"car_insurance\",\n\t\t\"language\": {\n\t\t\t\"code\": \"en\"\n\t\t},\n\t\t\"components\": [\n\t\t\t{\n\t\t\t\t\"type\": \"header\",\n\t\t\t\t\"parameters\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"type\": \"image\",\n\t\t\t\t\t\t\"image\": {\n\t\t\t\t\t\t\t\"link\": \"http(s)://URL\"\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"type\": \"body\",\n\t\t\t\t\"parameters\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"type\": \"text\",\n\t\t\t\t\t\t\"text\": \"TEXT_STRING\"\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"type\": \"date_time\",\n\t\t\t\t\t\t\"date_time\": {\n\t\t\t\t\t\t\t\"fallback_value\": \"MONTH DAY, YEAR\"\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"type\": \"button\",\n\t\t\t\t\"sub_type\": \"quick_reply\",\n\t\t\t\t\"index\": \"0\",\n\t\t\t\t\"parameters\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"type\": \"payload\",\n\t\t\t\t\t\t\"payload\": \"PAYLOAD\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"type\": \"button\",\n\t\t\t\t\"sub_type\": \"quick_reply\",\n\t\t\t\t\"index\": \"2\",\n\t\t\t\t\"parameters\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"type\": \"payload\",\n\t\t\t\t\t\t\"payload\": \"PAYLOAD\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n\t\t]\n\t}\n}'",
              'php' => "<?php\n\$client = new Client();\n\$body = '{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"template\": {\n        \"name\": \"car_insurance\",\n        \"language\": {\n            \"code\": \"en\"\n        },\n        \"components\": [\n            {\n                \"type\": \"header\",\n                \"parameters\": [\n                    {\n                        \"type\": \"image\",\n                        \"image\": {\n                            \"link\": \"http(s)://URL\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"body\",\n                \"parameters\": [\n                    {\n                        \"type\": \"text\",\n                        \"text\": \"TEXT_STRING\"\n                    },\n                    {\n                        \"type\": \"date_time\",\n                        \"date_time\": {\n                            \"fallback_value\": \"MONTH DAY, YEAR\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"0\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"2\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            }\n        ]\n    }\n}';\n\$request = new Request('POST', '{{base_url}}/api/send/template', [\n    'Authorization' => 'Bearer <YOUR_AUTHORIZATION_TOKEN>',\n    'Content-Type' => 'application/json',\n], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody()->getContents();\necho \$responseBody;\n?>",
              'nodejs' => "var axios = require('axios');\nvar data = '{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"template\": {\n        \"name\": \"car_insurance\",\n        \"language\": {\n            \"code\": \"en\"\n        },\n        \"components\": [\n            {\n                \"type\": \"header\",\n                \"parameters\": [\n                    {\n                        \"type\": \"image\",\n                        \"image\": {\n                            \"link\": \"http(s)://URL\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"body\",\n                \"parameters\": [\n                    {\n                        \"type\": \"text\",\n                        \"text\": \"TEXT_STRING\"\n                    },\n                    {\n                        \"type\": \"date_time\",\n                        \"date_time\": {\n                            \"fallback_value\": \"MONTH DAY, YEAR\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"0\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"2\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            }\n        ]\n    }\n}';\n\nvar config = {\n  method: 'post',\n  url: '{{base_url}}/api/send/template',\n  headers: {\n    'Authorization': 'Bearer <YOUR_AUTHORIZATION_TOKEN>',\n    'Content-Type': 'application/json'\n  },\n  data: data\n};\n\naxios(config)\n  .then(function (response) {\n    console.log(JSON.stringify(response.data));\n  })\n  .catch(function (error) {\n    console.log(error);\n  });",
              'python' => "import requests\n\nurl = \"{{base_url}}/api/send/template\"\n\npayload = \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"template\": {\n        \"name\": \"car_insurance\",\n        \"language\": {\n            \"code\": \"en\"\n        },\n        \"components\": [\n            {\n                \"type\": \"header\",\n                \"parameters\": [\n                    {\n                        \"type\": \"image\",\n                        \"image\": {\n                            \"link\": \"http(s)://URL\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"body\",\n                \"parameters\": [\n                    {\n                        \"type\": \"text\",\n                        \"text\": \"TEXT_STRING\"\n                    },\n                    {\n                        \"type\": \"date_time\",\n                        \"date_time\": {\n                            \"fallback_value\": \"MONTH DAY, YEAR\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"0\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"2\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            }\n        ]\n    }\n}\";\n\nheaders = {\n  'Authorization': 'Bearer <YOUR_AUTHORIZATION_TOKEN>',\n  'Content-Type': 'application/json'\n}\n\nresponse = requests.request(\"POST\", url, headers=headers, data=payload)\n\nprint(response.text)",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nRequestBody body = RequestBody.create(mediaType, \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"media_type\": \"image\",\n    \"media_url\": \"https://images.pexels.com/photos/276267/pexels-photo-276267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2\",\n    \"caption\": \"your caption for image or video media types\",\n    \"file_name\": \"testFileName\"\n}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/send/media\")\n  .method(\"POST\", body)\n  .addHeader(\"Authorization\", \"Bearer <YOUR_AUTHORIZATION_TOKEN>\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/send/template\")\n\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer <YOUR_AUTHORIZATION_TOKEN>'\nrequest['Content-Type'] = 'application/json'\nrequest.body = \"{\n    \"phone\": \"+1 (968) 082-5846\",\n    \"template\": {\n        \"name\": \"car_insurance\",\n        \"language\": {\n            \"code\": \"en\"\n        },\n        \"components\": [\n            {\n                \"type\": \"header\",\n                \"parameters\": [\n                    {\n                        \"type\": \"image\",\n                        \"image\": {\n                            \"link\": \"http(s)://URL\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"body\",\n                \"parameters\": [\n                    {\n                        \"type\": \"text\",\n                        \"text\": \"TEXT_STRING\"\n                    },\n                    {\n                        \"type\": \"date_time\",\n                        \"date_time\": {\n                            \"fallback_value\": \"MONTH DAY, YEAR\"\n                        }\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"0\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            },\n            {\n                \"type\": \"button\",\n                \"sub_type\": \"quick_reply\",\n                \"index\": \"2\",\n                \"parameters\": [\n                    {\n                        \"type\": \"payload\",\n                        \"payload\": \"PAYLOAD\"\n                    }\n                ]\n            }\n        ]\n    }\n}\";\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
      ],
    ],
    [
      'title' => 'Templates',
      'value' => [
        [
          'title' => 'List templates',
          'method' => 'get',
          'route' => '/api/templates',
          'request' => [
            'curl' => "curl -X GET \n {{base_url}}/api/templates \n &nbsp; -H 'Authorization: Bearer your-bearer-token' \n &nbsp; -H 'Content-Type: application/json'",
            'php' => "<?php\n\$client = new Client();\n\$request = new Request('GET', '{{base_url}}/api/templates');\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\n\n// Use \$responseBody as needed\n",
            'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'get',\n  maxBodyLength: Infinity,\n  url: '{{base_url}}/api/contacts',\n  headers: { }\n};\n\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
            'python' => "import requests\n\nurl = \"{{base_url}}/api/templates\"\n\npayload={}\nheaders = {}\n\nresponse = requests.request(\"GET\", url, headers=headers, data=payload)\n\nprint(response.text)",
            'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"text/plain\");\nRequestBody body = RequestBody.create(mediaType, \"\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/templates\")\n  .method(\"GET\", body)\n  .build();\nResponse response = client.newCall(request).execute();",
            'ruby' => "require \"uri\"\nrequire \"net/http\"\n\nurl = URI(\"{{base_url}}/api/templates\")\n\nhttp = Net::HTTP.new(url.host, url.port);\nrequest = Net::HTTP::Get.new(url)\n\nresponse = http.request(request)\nputs response.read_body",
          ]
        ]
      ],
    ],
    [
        'title' => 'Upload Media',
        'value' => [
            [
                'title' => 'Upload media file',
                'method' => 'post',
                'route' => '/api/media/upload',
                'request' => [
                    'curl' => "curl -X POST \n {{base_url}}/api/media/upload \\\n  -H 'Authorization: Bearer your-bearer-token' \\\n  -F 'file=@/path/to/your/file.jpg' \\\n  -F 'organization=1'",

                    'php' => "<?php\nuse GuzzleHttp\\Client;\n\n\$client = new Client();\n\$response = \$client->request('POST', '{{base_url}}/api/media/upload', [\n    'headers' => [\n        'Authorization' => 'Bearer your-bearer-token'\n    ],\n    'multipart' => [\n        [\n            'name' => 'file',\n            'contents' => fopen('/path/to/file.jpg', 'r'),\n            'filename' => 'file.jpg'\n        ],\n               [\n            'name' => 'organization',\n            'contents' => '1'\n        ]\n    ]\n]);\necho \$response->getBody();",

                    'nodejs' => "const axios = require('axios');\nconst FormData = require('form-data');\nconst fs = require('fs');\n\nconst form = new FormData();\nform.append('file', fs.createReadStream('/path/to/file.jpg'));\nform.append('organization', '1');\n\naxios.post('{{base_url}}/api/media/upload', form, {\n  headers: {\n    ...form.getHeaders(),\n    'Authorization': 'Bearer your-bearer-token'\n  }\n})\n.then(response => console.log(response.data))\n.catch(error => console.error(error));",

                    'python' => "import requests\n\nurl = \"{{base_url}}/api/media/upload\"\nfiles = {'file': open('/path/to/file.jpg', 'rb')}\ndata = {'organization': '1'}\nheaders = {'Authorization': 'Bearer your-bearer-token'}\n\nresponse = requests.post(url, files=files, data=data, headers=headers)\nprint(response.text)",

                    'java' => "OkHttpClient client = new OkHttpClient().newBuilder().build();\n\nMediaType mediaType = MediaType.parse(\"image/jpeg\");\nFile file = new File(\"/path/to/file.jpg\");\nRequestBody fileBody = RequestBody.create(mediaType, file);\n\nMultipartBody requestBody = new MultipartBody.Builder()\n    .setType(MultipartBody.FORM)\n    .addFormDataPart(\"file\", file.getName(), fileBody)\n    .addFormDataPart(\"organization\", \"1\")\n    .build();\n\nRequest request = new Request.Builder()\n    .url(\"{{base_url}}/api/media/upload\")\n    .method(\"POST\", requestBody)\n    .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n    .build();\n\nResponse response = client.newCall(request).execute();\nSystem.out.println(response.body().string());",

                    'ruby' => "require 'net/http'\nrequire 'uri'\nrequire 'mime/types'\n\nuri = URI.parse(\"{{base_url}}/api/media/upload\")\nrequest = Net::HTTP::Post::Multipart.new uri.path,\n  \"file\" => UploadIO.new(File.open(\"/path/to/file.jpg\"), \"image/jpeg\", \"file.jpg\"),\n  \"organization\" => \"1\"\nrequest[\"Authorization\"] = \"Bearer your-bearer-token\"\n\nresponse = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|\n  http.request(request)\nend\nputs response.body",
                ]
            ],

        ],
    ],
    [
        'title' => 'Get Conversations',
        'value' => [
            [
                'title' => 'Get conversations or contact list',
                'method' => 'get',
                'route' => '/api/get-conversations/{uuid?}',
                'request' => [
                    'curl' => "curl -X GET \n {{base_url}}/api/get-conversations/{uuid} \\\n  -H 'Authorization: Bearer your-bearer-token' \\\n  -H 'Content-Type: application/json' \\\n  -G --data-urlencode \"organization=1\"",

                    'php' => "<?php\nuse GuzzleHttp\\Client;\n\n\$client = new Client();\n\$response = \$client->request('GET', '{{base_url}}/api/get-conversations/{uuid}', [\n    'headers' => [\n        'Authorization' => 'Bearer your-bearer-token',\n    ],\n    'query' => [\n        'organization' => 1\n    ]\n]);\necho \$response->getBody();",

                    'nodejs' => "const axios = require('axios');\n\naxios.get('{{base_url}}/api/get-conversations/{uuid}', {\n  headers: {\n    'Authorization': 'Bearer your-bearer-token'\n  },\n  params: {\n    organization: 1\n  }\n})\n.then(response => console.log(response.data))\n.catch(error => console.error(error));",

                    'python' => "import requests\n\nurl = \"{{base_url}}/api/get-conversations/{uuid}\"\nheaders = {\n    'Authorization': 'Bearer your-bearer-token'\n}\nparams = {\n    'organization': 1\n}\nresponse = requests.get(url, headers=headers, params=params)\nprint(response.text)",

                    'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nHttpUrl.Builder urlBuilder = HttpUrl.parse(\"{{base_url}}/api/get-conversations/{uuid}\").newBuilder();\nurlBuilder.addQueryParameter(\"organization\", \"1\");\n\nRequest request = new Request.Builder()\n    .url(urlBuilder.build())\n    .get()\n    .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n    .build();\n\nResponse response = client.newCall(request).execute();\nSystem.out.println(response.body().string());",

                    'ruby' => "require 'uri'\nrequire 'net/http'\n\nuri = URI.parse(\"{{base_url}}/api/get-conversations/{uuid}?organization=1\")\nrequest = Net::HTTP::Get.new(uri)\nrequest[\"Authorization\"] = \"Bearer your-bearer-token\"\n\nresponse = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|\n  http.request(request)\nend\nputs response.body",
                ]
            ],
        ],
    ],
    [
      'title' => 'Contact Notes',
      'value' => [
        [
          'title' => 'List notes for a contact',
          'method' => 'get',
          'route' => '/api/contacts/{uuid}/notes',
          'request' => [
            'curl' => "curl -X GET \n {{base_url}}/api/contacts/{uuid}/notes \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json'",
            'php' => "<?php\nuse GuzzleHttp\\Client;\n\n\$client = new Client();\n\n\$request = new Request('GET', '{{base_url}}/api/contacts/{uuid}/notes');\n\n\$res=\$client->sendAsync(\$request)->wait();\n\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
            'nodejs' => "var axios = require('axios');\n\nvar config = {\n  method: 'get',\n  url: '{{base_url}}/api/contacts/{uuid}/notes',\n  headers: { 'Authorization': 'Bearer your-bearer-token' }\n};\n\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
            'python' => "import requests\n\nurl = \"{{base_url}}/api/contacts/{uuid}/notes\"\nheaders = { 'Authorization': 'Bearer your-bearer-token' }\nresponse = requests.get(url, headers=headers)\nprint(response.text)",
            'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts/{uuid}/notes\")\n  .get()\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .build();\nResponse response = client.newCall(request).execute();\nSystem.out.println(response.body().string());",
            'ruby' => "require 'uri'\nrequire 'net/http'\n\nurl = URI(\"{{base_url}}/api/contacts/{uuid}/notes\")\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Get.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
        [
          'title' => 'Add note to a contact',
          'method' => 'post',
          'route' => '/api/contacts/notes',
          'request' => [
            'curl' => "curl -X POST \n {{base_url}}/api/contacts/notes \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json' \n -d '{\"contact\":\"{uuid}\",\"notes\":\"This is a note\"}'",
            'php' => "<?php\n\$client = new Client();\n\$body = '{\"contact\":\"{uuid}\",\"notes\":\"This is a note\"}';\n\$request = new Request('POST', '{{base_url}}/api/contacts/notes', ['Authorization' => 'Bearer your-bearer-token', 'Content-Type' => 'application/json'], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
            'nodejs' => "var axios = require('axios');\nvar data = JSON.stringify({ contact: '{uuid}', notes: 'This is a note' });\nvar config = {\n  method: 'post',\n  url: '{{base_url}}/api/contacts/notes',\n  headers: { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' },\n  data: data\n};\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
            'python' => "import requests\n\nurl = \"{{base_url}}/api/contacts/notes\"\npayload = { 'contact': '{uuid}', 'notes': 'This is a note' }\nheaders = { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' }\nresponse = requests.post(url, json=payload, headers=headers)\nprint(response.text)",
            'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nRequestBody body = RequestBody.create(mediaType, \"{\\\"contact\\\":\\\"{uuid}\\\",\\\"notes\\\":\\\"This is a note\\\"}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/contacts/notes\")\n  .post(body)\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();\nSystem.out.println(response.body().string());",
            'ruby' => "require 'uri'\nrequire 'net/http'\nrequire 'json'\n\nurl = URI(\"{{base_url}}/api/contacts/notes\")\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nrequest['Content-Type'] = 'application/json'\nrequest.body = JSON.dump({ contact: '{uuid}', notes: 'This is a note' })\nresponse = http.request(request)\nputs response.read_body",
          ]
        ],
      ],
    ],
    [
      'title' => 'Tickets',
      'value' => [
        [
          'title' => 'Update ticket status',
          'method' => 'post',
          'route' => '/api/tickets/{uuid}/update',
          'request' => [
            'curl' => "curl -X POST \n {{base_url}}/api/tickets/{uuid}/update \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json' \n -d '{\"status\":\"open\"}'",
            'php' => "<?php\n\$client = new Client();\n\$body = '{\"status\":\"open\"}';\n\$request = new Request('POST', '{{base_url}}/api/tickets/{uuid}/update', ['Authorization' => 'Bearer your-bearer-token', 'Content-Type' => 'application/json'], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
            'nodejs' => "var axios = require('axios');\nvar data = JSON.stringify({ status: 'open' });\nvar config = {\n  method: 'post',\n  url: '{{base_url}}/api/tickets/{uuid}/update',\n  headers: { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' },\n  data: data\n};\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
            'python' => "import requests\n\nurl = \"{{base_url}}/api/tickets/{uuid}/update\"\npayload = { 'status': 'open' }\nheaders = { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' }\nresponse = requests.post(url, json=payload, headers=headers)\nprint(response.text)",
            'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nRequestBody body = RequestBody.create(mediaType, \"{\\\"status\\\":\\\"open\\\"}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/tickets/{uuid}/update\")\n  .post(body)\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();\nSystem.out.println(response.body().string());",
            'ruby' => "require 'uri'\nrequire 'net/http'\nrequire 'json'\n\nurl = URI(\"{{base_url}}/api/tickets/{uuid}/update\")\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nrequest['Content-Type'] = 'application/json'\nrequest.body = JSON.dump({ status: 'open' })\nresponse = http.request(request)\nputs response.read_body",
          ],
          'notes' => 'The `status` parameter accepts values: `open` or `closed`.'
        ],
        [
          'title' => 'Assign ticket to team member',
          'method' => 'post',
          'route' => '/api/tickets/{uuid}/assign',
          'request' => [
            'curl' => "curl -X POST \n {{base_url}}/api/tickets/{uuid}/assign \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json' \n -d '{\"user_id\":1}'",
            'php' => "<?php\n\$client = new Client();\n\$body = '{\"user_id\":1}';\n\$request = new Request('POST', '{{base_url}}/api/tickets/{uuid}/assign', ['Authorization' => 'Bearer your-bearer-token', 'Content-Type' => 'application/json'], \$body);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
            'nodejs' => "var axios = require('axios');\nvar data = JSON.stringify({ user_id: 1 });\nvar config = {\n  method: 'post',\n  url: '{{base_url}}/api/tickets/{uuid}/assign',\n  headers: { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' },\n  data: data\n};\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
            'python' => "import requests\n\nurl = \"{{base_url}}/api/tickets/{uuid}/assign\"\npayload = { 'user_id': 1 }\nheaders = { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' }\nresponse = requests.post(url, json=payload, headers=headers)\nprint(response.text)",
            'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nRequestBody body = RequestBody.create(mediaType, \"{\\\"user_id\\\":1}\");\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/tickets/{uuid}/assign\")\n  .post(body)\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();\nSystem.out.println(response.body().string());",
            'ruby' => "require 'uri'\nrequire 'net/http'\nrequire 'json'\n\nurl = URI(\"{{base_url}}/api/tickets/{uuid}/assign\")\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nrequest['Content-Type'] = 'application/json'\nrequest.body = JSON.dump({ user_id: 1 })\nresponse = http.request(request)\nputs response.read_body",
          ],
          'notes' => 'The `user_id` parameter should be a valid user ID in the organization.'
        ],
        [
          'title' => 'List team members',
          'method' => 'get',
          'route' => '/api/team',
          'request' => [
            'curl' => "curl -X GET \n {{base_url}}/api/team \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json'",
            'php' => "<?php\n\$client = new Client();\n\$request = new Request('GET', '{{base_url}}/api/team', ['Authorization' => 'Bearer your-bearer-token']);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\necho \$responseBody;\n?>",
            'nodejs' => "var axios = require('axios');\nvar config = {\n  method: 'get',\n  url: '{{base_url}}/api/team',\n  headers: { 'Authorization': 'Bearer your-bearer-token' }\n};\naxios(config)\n.then(function (response) {\n  console.log(JSON.stringify(response.data));\n})\n.catch(function (error) {\n  console.log(error);\n});",
            'python' => "import requests\n\nurl = \"{{base_url}}/api/team\"\nheaders = { 'Authorization': 'Bearer your-bearer-token' }\nresponse = requests.get(url, headers=headers)\nprint(response.text)",
            'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/team\")\n  .get()\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .build();\nResponse response = client.newCall(request).execute();\nSystem.out.println(response.body().string());",
            'ruby' => "require 'uri'\nrequire 'net/http'\n\nurl = URI(\"{{base_url}}/api/team\")\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Get.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nresponse = http.request(request)\nputs response.read_body",
          ],
          'notes' => 'Returns all team members for the current organization.'
        ],
        [
          'title' => 'Get ticket status counts',
          'method' => 'post',
          'route' => '/api/tickets/status-counts',
          'request' => [
              'curl' => "curl -X POST \n {{base_url}}/api/tickets/status-counts \n -d 'organization=ORG_ID' -d 'user_id=USER_ID' \n -H 'Authorization: Bearer your-bearer-token' \n -H 'Content-Type: application/json'",
              'php' => "<?php\n\$client = new Client();\n\$request = new Request('POST', '{{base_url}}/api/tickets/status-counts', [\n    'json' => [\n        'organization' => 'ORG_ID',\n        'user_id' => 'USER_ID'\n    ]\n]);\n\$res = \$client->sendAsync(\$request)->wait();\n\$responseBody = \$res->getBody();\n// Use \$responseBody as needed\n",
              'nodejs' => "var axios = require('axios');\nvar data = { organization: 'ORG_ID', user_id: 'USER_ID' };\nvar config = { method: 'post', url: '{{base_url}}/api/tickets/status-counts', headers: { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' }, data: data };\naxios(config)\n.then(function (response) {\n  console.log(response.data);\n})\n.catch(function (error) {\n  console.log(error);\n});",
              'python' => "import requests\nurl = \"{{base_url}}/api/tickets/status-counts\"\ndata = { 'organization': 'ORG_ID', 'user_id': 'USER_ID' }\nheaders = { 'Authorization': 'Bearer your-bearer-token', 'Content-Type': 'application/json' }\nresponse = requests.post(url, json=data, headers=headers)\nprint(response.json())",
              'java' => "OkHttpClient client = new OkHttpClient().newBuilder()\n  .build();\nMediaType mediaType = MediaType.parse(\"application/json\");\nString json = \"{\\\"organization\\\": \\\"ORG_ID\\\", \\\"user_id\\\": \\\"USER_ID\\\"}\";\nRequestBody body = RequestBody.create(mediaType, json);\nRequest request = new Request.Builder()\n  .url(\"{{base_url}}/api/tickets/status-counts\")\n  .method(\"POST\", body)\n  .addHeader(\"Authorization\", \"Bearer your-bearer-token\")\n  .addHeader(\"Content-Type\", \"application/json\")\n  .build();\nResponse response = client.newCall(request).execute();",
              'ruby' => "require 'uri'\nrequire 'net/http'\nrequire 'json'\nurl = URI(\"{{base_url}}/api/tickets/status-counts\")\nhttp = Net::HTTP.new(url.host, url.port)\nrequest = Net::HTTP::Post.new(url)\nrequest['Authorization'] = 'Bearer your-bearer-token'\nrequest['Content-Type'] = 'application/json'\nrequest.body = JSON.dump({ 'organization' => 'ORG_ID', 'user_id' => 'USER_ID' })\nresponse = http.request(request)\nputs response.read_body",
          ],
          'notes' => 'Returns the count of tickets for each status: unassigned, open, closed, and all. Respects ticket assignment and team role logic. Parameters: organization (required), user_id (required).',
        ],
      ],
    ],
];