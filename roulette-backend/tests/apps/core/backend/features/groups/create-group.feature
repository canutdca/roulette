Feature: Get a list of groups

	Scenario: Save group with members
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

	Scenario: Save group without members
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
