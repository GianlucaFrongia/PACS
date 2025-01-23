from selenium.webdriver.common.by import By

class LoginPageLocators(object):
    username_field = (By.ID, "username")
    password_field = (By.ID, "password")
    submit_Button = (By.ID, "kc-login")

class DashboardLocators(object):
    search_field = (By.ID, "combo-box-demo")
    search_Button = (By.ID, "searchButton")
    search_Off_Button = (By.ID, "searchOffButton")
    search_List = (By.XPATH, "//div[@id='galleryList']//div")
    first_instance = (By.XPATH, "//div[@id='galleryList']/div[1]")
    search_Tag_Dropdown = (By.ID, "dropdown")
    tag_FHNW = (By.XPATH, "//ul[@role='listbox']/li[2]")
    tagManagement = (By.CLASS_NAME, "tag-management-button")

class DetailviewLocators(object):
    tag_checkbox = (By.ID, "multiple-checkbox")
    check_FHNW = (By.XPATH, "//ul[@role='listbox']/li[1]")
    back_button = (By.ID, "backButton")
    comment_textfield = (By.ID, "outlined-multiline-static")
    send_button = (By.XPATH, "//button[text()='Senden']")
    comment_list = (By.CLASS_NAME, "MuiCard-root")
    comment_delete_button = (By.XPATH, "//button[@aria-label='delete']")

class TagManagementLocators(object):
    add_Tag = (By.ID, "add")
    dialog_add_tag = (By.ID, "name")
    dialog_add_button = (By.XPATH, "//button[text()='Erstellen']")

    edit_Tag = (By.XPATH, "//div[@data-rowindex='3']//div[@data-field='edit']//button[contains(text(),'Edit')]")
    dialog_edit_tag = (By.ID, "name")
    dialog_edit_button = (By.XPATH, "//button[text()='Umbenennen']")

    delete_Tag = (By.XPATH, "//div[@data-rowindex='3']//div[@data-field='delete']//button[contains(text(),'Delete')]")
    dialog_delete_tag = (By.XPATH, "//button[text()='Löschen']")
