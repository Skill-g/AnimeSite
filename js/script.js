const violethoverd = document.getElementsByClassName('violetdiscription')
const violethover = document.getElementsByClassName('violet')

for (var i = 0; i < violethover.length; i++) {
    violethover[i].addEventListener('mouseover', function() {
        for (var j = 0; j < violethover.length; j++) {
            violethoverd[j].style.opacity = '1';
        }
    });

    violethover[i].addEventListener('mouseout', function() {
        for (var j = 0; j < violethover.length; j++) {
            violethoverd[j].style.opacity = '0';
        }
    });
}