from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

class LoginPageElement(object):
    def __set__(self, obj, value):
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element(By.ID, self.locator)
        )
        driver.find_element(By.ID, self.locator).clear()
        driver.find_element(By.ID, self.locator).send_keys(value)

    def __get__(self, obj, owner):
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element(By.ID, self.locator)
        )
        element = driver.find_element(By.ID, self.locator)
        return element.get_attribute("value")

class DashboardElement(object):
    def __set__(self, obj, value):
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element(By.CLASS_NAME, self.locator)
        )
        driver.find_element(By.CLASS_NAME, self.locator).clear()
        driver.find_element(By.CLASS_NAME, self.locator).send_keys(value)

    def __get__(self, obj, owner):
        driver = obj.driver
        WebDriverWait(driver, 100).until(
            lambda driver: driver.find_element(By.CLASS_NAME, self.locator)
        )
        element = driver.find_element(By.CLASS_NAME, self.locator)
        return element.get_attribute("value")
