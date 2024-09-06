<?php
include 'connection.php';

// Qabul qilingan ma'lumotlarni tekshirish
$data = json_decode(file_get_contents('php://input'), true);

echo $data;

function formatDate($dateString)
{
    $time = $dateString + 5 * 3600;

    $formattedDate = date("Y-m-d", $time);
    return $formattedDate;
}

if ($data) {
    $weather_when = formatDate($data['dt']);
    $weather_wind = $data['wind']['speed'];
    $weather_temperature = $data['main']['temp'];
    $weather_humidity = $data['main']['humidity'];
    $weather_visibility = $data['visibility'];
    $weather_description = $data['weather'][0]['description'];
    $city_name = $data['name'];


    $sql_check = "SELECT * FROM `prototype3` WHERE city = '$city_name' LIMIT 1";
    $result_check = mysqli_query($conn, $sql_check);

    if (mysqli_num_rows($result_check) > 0) {

        $sql_update = "UPDATE `prototype3` SET description = '$weather_description', temperature = '$weather_temperature', wind = '$weather_wind',humidity = '$weather_humidity', visibility = '$weather_visibility' , weather_when = '$weather_when' WHERE city = '$city_name'";
        if (mysqli_query($conn, $sql_update)) {
            echo "Ma'lumotlar muvaffaqiyatli yangilandi";
        } else {
            echo "Xatolik: " . mysqli_error($conn);
        }
    } else {

        $sql = "INSERT INTO `prototype3` (city,description,temperature,wind,humidity,visibility,weather_when) VALUES ('$city_name','$weather_description','$weather_temperature','$weather_wind','$weather_humidity','$weather_visibility','$weather_when')";

        if (mysqli_query($conn, $sql)) {
            echo "Ma'lumotlar muvaffaqiyatli qo'shildi";
        } else {
            echo "Xatolik: " . mysqli_error($conn);
        }
    }
} else {
    echo "Noto'g'ri ma'lumotlarni qabul qildingiz";
}


mysqli_close($conn);
