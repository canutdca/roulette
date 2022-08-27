Feature: Create group

	Scenario: Save group with all info
		When I send a PUT request to "/groups" with body:
			"""
			{
				"id": "0affe324-8d27-11ec-b909-0242ac120002",
				"name": "group test",
				"members": [
					"Batman",
					"Robin"
				],
				"ceremonies": [
					{ "id": "f22c1063-1614-41ce-a4de-ae2ee033ceb5", "name": "ceremony one" },
					{ "id": "e80b2080-f807-4b5f-b0e1-c88ff60f23bf", "name": "ceremony two" }
				]
			}
			"""
		Then the response status code should be 200
		And the response should be empty

	Scenario: Save group with name and members
		When I send a PUT request to "/groups" with body:
			"""
			{
				"id": "0affe324-8d27-11ec-b909-0242ac120002",
				"name": "group test",
				"members": [
					"Batman",
					"Robin"
				]
			}
			"""
		Then the response status code should be 200
		And the response should be empty

	Scenario: Save group with name and ceremonies
		When I send a PUT request to "/groups" with body:
			"""
			{
				"id": "0affe324-8d27-11ec-b909-0242ac120002",
				"name": "group test",
				"ceremonies": [
					{ "id": "f22c1063-1614-41ce-a4de-ae2ee033ceb5", "name": "ceremony one" },
					{ "id": "e80b2080-f807-4b5f-b0e1-c88ff60f23bf", "name": "ceremony two" }
				]
			}
			"""
		Then the response status code should be 200
		And the response should be empty

	Scenario: Save group with only name
		When I send a PUT request to "/groups" with body:

			"""
			{
				"id": "0affe324-8d27-11ec-b909-0242ac120002",
				"name": "group test"
			}
			"""
		Then the response status code should be 200
		And the response should be empty

	Scenario: Save group without name
		When I send a PUT request to "/groups" with body:
			"""
			{
				"id": "0affe324-8d27-11ec-b909-0242ac120002"
			}
			"""
		Then the response status code should be 422

	Scenario: Save group with empty name
		When I send a PUT request to "/groups" with body:
			"""
			{
				"id": "0affe324-8d27-11ec-b909-0242ac120002",
				"name": ""
			}
			"""
		Then the response status code should be 422
