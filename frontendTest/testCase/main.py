import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
import time
import page


class Mip(unittest.TestCase):

    def setUp(self):
        # ToDo: check where the webdriver is located on your device
        self.driver = webdriver.Firefox(
            executable_path=r"C:\Users\olive\IdeaProjects\mip2024-03-bfs\frontendTest\geckodriver.exe")

        # ToDo: Change URL if Web-App is uploaded to the server
        self.driver.get("http://localhost:5173/")

        # ToDo: check if the login data are correct
        login_page = page.LoginPage(self.driver)
        login_page.user_text = 'user'
        login_page.password_text = '1234'
        login_page.click_submit_button()

    def test_searchbar(self):
        dashboard_page = page.Dashboard(self.driver)
        time.sleep(4)

        # insert search word
        dashboard_page.search_bar_element = 'Katze'
        dashboard_page.click_search_button()
        time.sleep(4)

        # check whether the right amount of images are shown
        search_results = dashboard_page.get_search_results_length()
        self.assertTrue(search_results == 7, "No results found.")

        # reset the searchbar
        dashboard_page.click_search_off_button()
        time.sleep(4)

        # check whether all images are displayed again
        search_results = dashboard_page.get_search_results_length()
        self.assertTrue(search_results == 630, "No results found.")

    def test_searchTag(self):
        dashboard_page = page.Dashboard(self.driver)
        time.sleep(4)

        # navigate to the Detailview
        dashboard_page.click_first_instance()
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.ID, "multiple-checkbox")))
        detailview_page = page.Detailview(self.driver)

        # add the tag 'fhnw' to the first instance
        detailview_page.click_tag_checkbox()
        time.sleep(1)
        detailview_page.click_FHNW_check()

        # navigate back to dashboard
        webdriver.ActionChains(self.driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(2)
        detailview_page.click_back_button()
        time.sleep(4)

        # search for the instance with the tag 'fhnw'
        dashboard_page.click_tag_dropdown()
        time.sleep(1)
        dashboard_page.click_tag_fhnw()
        webdriver.ActionChains(self.driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(1)
        dashboard_page.click_search_button()
        search_tags_results = dashboard_page.get_search_results_length()
        self.assertTrue(search_tags_results == 1, "No results found.")

        dashboard_page.click_search_off_button()

        # navigate back to the instance and remove the tag
        dashboard_page.click_first_instance()
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.ID, "multiple-checkbox")))
        detailview_page.click_tag_checkbox()
        time.sleep(1)
        detailview_page.click_FHNW_check()
        webdriver.ActionChains(self.driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(2)
        detailview_page.click_back_button()
        time.sleep(4)
        dashboard_page.click_tag_dropdown()
        time.sleep(1)
        dashboard_page.click_tag_fhnw()
        webdriver.ActionChains(self.driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(1)
        dashboard_page.click_search_button()
        search_tags_results = dashboard_page.get_search_results_length()
        self.assertTrue(search_tags_results == 0, "No results found.")

    def test_comments(self):
        dashboard_page = page.Dashboard(self.driver)
        time.sleep(4)

        # navigate to the Detailview
        dashboard_page.click_first_instance()
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.ID, "multiple-checkbox")))
        detailview_page = page.Detailview(self.driver)

        # create a new comment
        wait.until(ec.visibility_of_element_located((By.ID, "outlined-multiline-static")))
        detailview_page.addCommentElement = 'Das ist ein Querschnitt durch das Rückenmark einer Katze.'
        detailview_page.click_send_button()
        time.sleep(6)

        # check for the comment
        elements_in_commentlist = detailview_page.length_commentlist()
        self.assertTrue(elements_in_commentlist == 1, "not right number of comments.")

        # delete the comment
        detailview_page.click_delete_comment()
        time.sleep(6)

        # check if comment is deleted
        elements_in_commentlist = detailview_page.length_commentlist()
        self.assertTrue(elements_in_commentlist == 0, "not right number of comments.")

    def test_add_edit_delete_new_tag(self):
        dashboard_page = page.Dashboard(self.driver)
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.CLASS_NAME, "tag-management-button")))
        dashboard_page.click_tagManagement()

        # Navigate to Tagmanagement
        tagmanagement_page = page.TagManagement(self.driver)
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.ID, "add")))
        tags_before = tagmanagement_page.grid_elements()

        # adding new Tag
        tagmanagement_page.click_add_tag_button()
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.ID, "add-dialog")))
        tagmanagement_page.tag_name = 'test'
        tagmanagement_page.click_dialog_add_button()
        time.sleep(6)

        # testing creation of new tag
        tags_after = tagmanagement_page.grid_elements()
        self.assertTrue(tags_after == (tags_before + 1), "Not equal.")

        # editing the newly created tag
        tagmanagement_page.click_edit_tag_button()
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.ID, "edit-dialog")))
        tagmanagement_page.edit_tag = 'Test'
        tagmanagement_page.click_dialog_edit_button()
        time.sleep(6)

        # testing editing of the new tag
        new_tag_row = self.driver.find_element_by_xpath("//div[@data-rowindex='3']//div[@data-field='namespace']")
        namespace = new_tag_row.text
        self.assertTrue(namespace == 'Test', "Wrong Tagname.")

        # delete the newly created tag
        tagmanagement_page.click_delete_tag_button()
        wait = WebDriverWait(self.driver, 10)
        wait.until(ec.visibility_of_element_located((By.ID, "delete-dialog")))
        tagmanagement_page.click_dialog_delete_button()
        time.sleep(7)

        # testing if row was deleted
        tags_after_delete = tagmanagement_page.grid_elements()
        self.assertTrue(tags_after_delete == tags_before, "Tag was not deleted.")

    def tearDown(self):
        user_field = self.driver.find_element_by_class_name("settings-text")
        hover = ActionChains(self.driver).move_to_element(user_field)
        hover.perform()
        time.sleep(1)

        logout_button = self.driver.find_element_by_xpath("//button[text()='Ausloggen']")
        logout_button.click()
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
