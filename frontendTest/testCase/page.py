from element import LoginPageElement
from locators import *

class UserTextElement(LoginPageElement):
    locator = 'username'

class PasswordTextElement(LoginPageElement):
    locator = 'password'

class SearchBarElement(LoginPageElement):
    locator = 'combo-box-demo'

class AddCommentElement(LoginPageElement):
    locator = 'outlined-multiline-static'

class AddTagNameElement(LoginPageElement):
    locator = 'name'

class EditTagNameElement(LoginPageElement):
    locator = 'name'

class BasePage(object):
    def __init__(self, driver):
        self.driver = driver

class LoginPage(BasePage):
    user_text = UserTextElement()
    password_text = PasswordTextElement()

    def insert_login_data(self):
        user = self.driver.find_element(*LoginPageLocators.username_field)
        user.send_keys()
    def is_title_matches(self):
        return "Vite + React + TS" in self.driver.title

    def click_submit_button(self):
        element = self.driver.find_element(*LoginPageLocators.submit_Button)
        element.click()

class Dashboard(BasePage):
    search_bar_element = SearchBarElement()

    def insert_search_text(self):
        search = self.driver.find_element(*DashboardLocators.search_field)
        search.send_key()

    def click_first_instance(self):
        element = self.driver.find_element(*DashboardLocators.first_instance)
        element.click()
    def click_tag_dropdown(self):
        element = self.driver.find_element(*DashboardLocators.search_Tag_Dropdown)
        element.click()

    def click_tag_fhnw(self):
        element = self.driver.find_element(*DashboardLocators.tag_FHNW)
        element.click()

    def click_search_button(self):
        element = self.driver.find_element(*DashboardLocators.search_Button)
        element.click()

    def click_search_off_button(self):
        element = self.driver.find_element(*DashboardLocators.search_Off_Button)
        element.click()

    def get_search_results_length(self):
        search_results = self.driver.find_elements(*DashboardLocators.search_List)
        return len(search_results)

    def click_tagManagement(self):
        element = self.driver.find_element(*DashboardLocators.tagManagement)
        element.click()

class Detailview(BasePage):
    addCommentElement = AddCommentElement()
    def click_tag_checkbox(self):
        element = self.driver.find_element(*DetailviewLocators.tag_checkbox)
        element.click()

    def click_FHNW_check(self):
        element = self.driver.find_element(*DetailviewLocators.check_FHNW)
        element.click()

    def click_back_button(self):
        element = self.driver.find_element(*DetailviewLocators.back_button)
        element.click()

    def insert_comment_text(self):
        search = self.driver.find_element(*DetailviewLocators.comment_textfield)
        search.send_key()

    def click_send_button(self):
        element = self.driver.find_element(*DetailviewLocators.send_button)
        element.click()

    def click_delete_comment(self):
        element = self.driver.find_element(*DetailviewLocators.comment_delete_button)
        element.click()

    def length_commentlist(self):
        search_results = self.driver.find_elements(*DetailviewLocators.comment_list)
        return len(search_results)

class TagManagement(BasePage):
    tag_name = AddTagNameElement()
    edit_tag = EditTagNameElement()

    def grid_elements(self):
        grid = self.driver.find_element(By.CLASS_NAME, "MuiDataGrid-virtualScrollerRenderZone")
        num_rows = len(grid.find_elements(By.XPATH, ".//div[@role='row']"))
        return num_rows
    def click_add_tag_button(self):
        element = self.driver.find_element(*TagManagementLocators.add_Tag)
        element.click()

    def insert_tag_name(self):
        tagname = self.driver.find_element(*TagManagementLocators.dialog_add_tag)
        tagname.send_key()

    def click_dialog_add_button(self):
        element = self.driver.find_element(*TagManagementLocators.dialog_add_button)
        element.click()

    def click_edit_tag_button(self):
        element = self.driver.find_element(*TagManagementLocators.edit_Tag)
        element.click()

    def insert_tag_editing(self):
        editTag = self.driver.find_element(*TagManagementLocators.dialog_edit_tag)
        editTag.clear()
        editTag.send_key()

    def click_dialog_edit_button(self):
        element = self.driver.find_element(*TagManagementLocators.dialog_edit_button)
        element.click()

    def click_delete_tag_button(self):
        element = self.driver.find_element(*TagManagementLocators.delete_Tag)
        element.click()

    def click_dialog_delete_button(self):
        element = self.driver.find_element(*TagManagementLocators.dialog_delete_tag)
        element.click()
