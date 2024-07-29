import pytest

from main import filter_food_trucks, FoodTruckPermit, Location


@pytest.fixture
def sample_food_trucks():
    return [
        FoodTruckPermit(objectid="1", applicant="Joe's Tacos", facilitytype="Truck",
            cnn="1", address="123 Main St", permit="Permit123", status="APPROVED",
            fooditems="Tacos, Burritos", latitude=37.7749, longitude=-122.4194,
            schedule="http://example.com/schedule", received="2021-01-01", priorpermit=0,
            expirationdate="2022-01-01",
            location=Location(
                latitude=37.7749,
                longitude=-122.4194,
                human_address="123 Main St, San Francisco, CA"
            ).__dict__,
        ).__dict__,
        FoodTruckPermit(objectid="2", applicant="Best Burgers", facilitytype="Truck",
            cnn="2", address="456 Market St", permit="Permit456", status="REQUESTED",
            fooditems="Burgers, Fries", latitude=37.7749, longitude=-122.4194,
            schedule="http://example.com/schedule", received="2021-02-01", priorpermit=1,
            expirationdate="2022-02-01",
            location=Location(
                latitude=37.7749,
                longitude=-122.4194,
                human_address="456 Market St, San Francisco, CA"
            ).__dict__,
        ).__dict__,
        FoodTruckPermit(objectid="3", applicant="Cupcake Delight", facilitytype="Truck",
            cnn="3", address="789 Broadway St", permit="Permit789", status="APPROVED",
            fooditems="Cupcakes, Cookies", latitude=37.7749, longitude=-122.4194,
            schedule="http://example.com/schedule", received="2021-03-01", priorpermit=2,
            expirationdate="2022-03-01",
            location=Location(
                latitude=37.7749,
                longitude=-122.4194,
                human_address="789 Broadway St, San Francisco, CA"
            ).__dict__,
        ).__dict__,
    ]

def test_filter_food_trucks_status(sample_food_trucks):
    result = filter_food_trucks(sample_food_trucks, status="APPROVED", applicant="", street="")
    assert len(result) == 2
    assert result[0]['applicant'] == "Joe's Tacos"
    assert result[1]['applicant'] == "Cupcake Delight"

def test_filter_food_trucks_applicant(sample_food_trucks):
    result = filter_food_trucks(sample_food_trucks, status="APPROVED", applicant="joe", street="")
    assert len(result) == 1
    assert result[0]['applicant'] == "Joe's Tacos"

def test_filter_food_trucks_street(sample_food_trucks):
    result = filter_food_trucks(sample_food_trucks, status="APPROVED", applicant="", street="Broadway")
    assert len(result) == 1
    assert result[0]['address'] == "789 Broadway St"

def test_filter_food_trucks_all_criteria(sample_food_trucks):
    result = filter_food_trucks(sample_food_trucks, status="APPROVED", applicant="cupcake", street="broadway")
    assert len(result) == 1
    assert result[0]['applicant'] == "Cupcake Delight"
    assert result[0]['address'] == "789 Broadway St"
