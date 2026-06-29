# BDD Scenario

## TS-001 Collection List (Homepage)
```gherkin
Feature: Collection List

  Background: 
    Given User is in Collection Page

  Scenario: View Collection List
    When API return success response
    Then collection items should be displayed

  Scenario: View Collection List
    When API return error
    Then collection items should be not be displayed

  Scenario: View Collection Statistics
    When API return success
    Then total items stats should be displayed
    And completed stats should be displayed
    And total backlog stats should be displayed
    And limited item stats should be displayed

  Scenario: Collection Statistics Error
    When API return error
    Then statistics section should not be shown

  Scenario: Fiter Collection by Category
    When user select a category
    And API return success response
    Then only items of selected category should be shown
  
```

## TS-002 Collection Detail
```gherkin
Feature: Collection Detail

  Background: 
    Given User is in Collection Detail Page

  Scenarion: View Collection Detail
    When API return success response
    Then collection detail should be displayed

```


## TS-002 Collection Upload Form

## TS-003 Collection Edit Form

## TS-004 Collection Shelves (Under Construction)
