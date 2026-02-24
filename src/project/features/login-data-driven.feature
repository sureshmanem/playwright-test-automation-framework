Feature: Login with Test Data
  As a user of the application
  I want to log in using external test data files
  So that test maintenance is simplified

  Background:
    Given I navigate to data "urls.login" from "login"

  Scenario: Login with data-driven valid credentials
    When I enter data "validUser.username" from "login" in "UsernameInput" on "LoginPage"
    And I enter data "validUser.password" from "login" in "PasswordInput" on "LoginPage"
    And I click "LoginButton" on "LoginPage"
    Then the page URL should contain "secure"
    And "FlashMessage" should contain text "You logged into a secure area!" on "SecurePage"

  Scenario: Login with data-driven invalid credentials
    When I enter data "invalidUser.username" from "login" in "UsernameInput" on "LoginPage"
    And I enter data "invalidUser.password" from "login" in "PasswordInput" on "LoginPage"
    And I click "LoginButton" on "LoginPage"
    Then "FlashMessage" should contain text "Your username is invalid!" on "LoginPage"
