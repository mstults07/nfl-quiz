var Question = function(question, answers, correctAnswer, points) {
	this.question = question;
	this.correctAnswer = correctAnswer;
	this.answers = answers;
	this.points = points;
};

var quiz = [
	new Question("Which one of these teams is NOT in the NFC West?", ["Arizona Cardinals","Dallas Cowboys","St. Louis Rams","Seattle Seahawks", "San Francisco 49ers"], 1, 1),
	new Question("Which one of these teams is NOT in the AFC West?", ["Denver Broncos","San Diego Chargers","Houston Texans","Kansas City Chiefs", "Oakland Raiders"], 2, 1),
	new Question("Which one of these teams is NOT in the AFC North?", ["Cincinatti Bengals","Cleveland Browns","Pitsburgh Steelers","Baltimore Ravens","Indianapolis Colts"], 4, 1),
	new Question("Which one of these teams is NOT in the NFC North?", ["Green Bay Packers","Minnesota Vikings","Detroit Lions","Philadelphia Eagles", "Chicago Bears"], 3, 1),
	new Question("In which Division is the Dallas Cowboys?", ["NFC East","NFC West","AFC West","NFC South","AFC South"], 0, 1)
];

var questionCount = 0,
	playerScore = 0;

function displayQuestion(q) {
	document.getElementById('quiz--question').innerHTML = q.question;
	for(var i = 0; i < q.answers.length; i++) {
		document.getElementById('answer-label-' + (i + 1)).innerHTML = '<span></span>&emsp;' + q.answers[i];
	}
}

function hide(element) {
	element.style.display = 'none';
}

function show(element) {
	element.style.display = 'block';
}

function disableAnswers() {
	var answers = document.getElementsByName('answer-choice');
	for (var i = 0; i < answers.length;  i++){
    	answers[i].disabled = true;
	}
}

function clearAnswers() {
	var answers = document.getElementsByName('answer-choice');
	for (var i = 0; i < answers.length;  i++){
    	answers[i].disabled = false;
    	answers[i].value = 'off';
	}
}

function checkAnswer(q) {
	var answers = document.getElementsByName('answer-choice'),
		playerAnswer = "";

	for (var i = 0; i < answers.length; i++) {
		if(answers[i].checked) {
			var selector = 'label[for=' + answers[i].id + ']',
				label = document.querySelector(selector),
				text = label.innerHTML;
			playerAnswer = text.replace(/<\/?span[^>]*>/g,"").trim();
		}
	}

	if (playerAnswer === q.answers[q.correctAnswer]) {
		playerScore++;
		disableAnswers();
	}

	return playerAnswer === q.answers[q.correctAnswer];

}

function totalScore() {
	var total = 0;
	for(var i = 0; i < quiz.length; i++) {
		total += quiz[i].points;
	}
	return total;
}