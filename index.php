<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do list App</title>
    <script src="https://kit.fontawesome.com/15cef8c93e.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="CSS/style.css">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    <!-- Jquery CDN -->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <!-- Date Picker  -->
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css">

    <!-- Date Picker Main -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">

    <link rel="stylesheet" href="/resources/demos/style.css">

    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

    <!-- Date Picker Javascript Start -->
    <script>
    $(function() {
        $("#datepicker").datepicker({
            onSelect: function(dateText) {
                // TO Store the selected date in the local storage.
                localStorage.setItem("selectedDate", dateText);
            }
        });
    });


    function setReminder() {
        var selectedDate = $("#datepicker").datepicker("getDate");

        if (selectedDate !== null) {
            // Create a new Date object to represent the current time
            var now = new Date();

            // Compare the selected date with the current date and time
            if (selectedDate > now) {
                // Calculate the time difference in milliseconds
                var timeDiff = selectedDate - now;

                // Convert milliseconds to seconds
                var seconds = Math.floor(timeDiff / 1000);

                // Store the reminder in local storage
                setTimeout(function() {
                    var reminders = JSON.parse(localStorage.getItem('reminders')) || [];
                    reminders.push({
                        date: selectedDate,
                        message: 'Your task is due now!'
                    });
                    localStorage.setItem('reminders', JSON.stringify(reminders));
                }, seconds * 1000);
            } else {
                alert("Please select a future date for your task.");
            }
        } else {
            alert("Please select a date for your task.");
        }
    }
    //  Date Picker Javascript End

    // Search Bar Start
   
    // Search Bar End
    </script>
</head>

<style>
body {
    background: url('IMAGES/back4.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

#btn1 {
    top: 0;
    background-image: url('IMAGES/back4.jpg');
}

#btn2 {
    top: 0;
    background-image: url('IMAGES/back3.avif');
}

#btn3 {
    background-image: url('IMAGES/back5.jpg');
}
</style>

<body>


    <div class="btn-cont">
        <button id="btn1"></button>
        <button id="btn2"></button>
        <button id="btn3"></button>
    </div>
    <div class="wrapper">
        <h2>Choose Date For Task:</h2>
        <p>Date: <input type="text" id="datepicker"></p>
        <button onclick="setReminder()">Set Reminder</button>
    </div>
    <div class="container">
        <div class="header">
            <h2>Just Do it.</h2>
        </div>
        <div class="search">
            <input type="text" id="search-bar" placeholder="Search.....">
        </div>
        <div id="task-form">
            <input type="text" id="task-input" placeholder="What would you like to do?" require style="color: white;">
            <button class="add-btn" onclick="add()">Add Task</button>
        </div>
        <div id="filter-bar">
            <span class="active" id="all">All</span>
            <span class="filter-btn2" id="pending">Pending</span>
            <span class="filter-btn3" id="completed">Completed</span>
        </div>
        <button class="clear-btn">Clear All</button>
        <!-- Content to be Filtered -->
        <ul id="task-box" class="content-item">
           
        </ul>
        <div class="hr-tag">
            <hr>
        </div>
    </div>
    <div class="fit">
        
    </div>

    <script src="Javascript/script.js"></script>
</body>

</html>