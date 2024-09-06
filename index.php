<?php
include 'connection.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <title>Weather App</title>
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <div class="weather-app">
        <form class="search-form" action="">
            <input class="city-input" type="text" placeholder="Enter City Name" />
            <button class="search-btn" type="submit">
                <i class="material-icons">search</i>
            </button>
        </form>

        <div class="test_weather">
        <?php
        if (isset($_GET['cityname'])) { 
            $city = $_GET['cityname'];
            $today = date("Y-m-d"); 
            $sql_check = "SELECT * FROM prototype3 WHERE city = '$city' AND DATE(weather_when) >= '$today'";
            $result = mysqli_query($conn, $sql_check);
            if ($result && mysqli_num_rows($result) > 0) {
                $all_rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
                foreach ($all_rows as $index => $row) {
                    echo '<div class="city-date-section">
            <h2 class="city">'.$row['city'].'</h2>
            <p class="date">'.$row['weather_when'].'</p>
        </div>
        <div class="temperature-info">
            <div class="description">
                <i class="material-icons">sunny</i>
                <span class="description-text">'.$row['description'].'</span>
            </div>
            <div class="temp">'.$row['temperature'] .'°</div>
        </div>
        <div class="additional-info">
            <div class="humidity-info">
                <i class="material-icons">water_drop</i>
                <div>
                    <h3 class="humidity">' .$row['humidity'].'%</h3>
                    <p class="humidity-label">humidity</p>
                </div>
            </div>
            <div class="visibility-info">
                <i class="material-icons">visibility</i>
                <div>
                    <h3 class="visibility-distance">'.$row['visibility'].'KM/H</h3>
                    <p class="visibility">Visibility</p>
                </div>
            </div>
        </div>';
                }
            }
        }
        ?>    
        </div>
        
    </div>

    <script src="main.js"></script>
</body>

</html>