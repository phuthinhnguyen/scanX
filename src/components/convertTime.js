export const convertTime = (time) => {
    var now = Date.now();
    var distancetime = now - time;
    var years = Math.floor(distancetime / (1000 * 60 * 60 * 24 * 30 * 12))
    var months = Math.floor(distancetime / (1000 * 60 * 60 * 24 * 30))
    var days = Math.floor(distancetime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distancetime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distancetime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distancetime % (1000 * 60)) / 1000);

    if (years > 0) {
        return years == 1 ? years + " year ago" : years + " years ago"
    }
    else if (months > 0) {
        return months == 1 ? months + " month ago" : months + " months ago"
    }
    else if (days > 0) {
        return days == 1 ? days + " day ago" : days + " days ago"
    }
    else if (hours > 0) {
        return hours == 1 ? hours + " hour ago" : hours + " hours ago"
    }
    else if (minutes > 0) {
        return minutes == 1 ? minutes + " minute ago" : minutes + " minutes ago"
    }
    else if (seconds > 0) {
        return seconds == 1 ? seconds + " second ago" : seconds + " seconds ago"
    }
}