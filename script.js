const app = angular.module("notesApp", []);

app.controller("notesCtrl", function ($scope) {
  $scope.notes = JSON.parse(localStorage.getItem("notes")) || [];
  $scope.filteredNotes = [];
  $scope.currentPrompt = "What made you smile today?";
  $scope.entryDate = new Date().toISOString().split("T")[0];
  $scope.selectedMood = "";

  // Generate a random prompt
  $scope.generatePrompt = function () {
    const prompts = [
      "What are you grateful for today?",
      "Describe a moment that brought you joy.",
      "What’s a recent challenge you overcame?",
      "What is one thing you love about yourself?",
      "What is one thing you're looking forward to this week?",
      "What is one thing you've learned recently?",
      "What is one thing you're proud of?",
      "What is one thing you're grateful for in your life right now?",
      "What is one thing you're excited about?",
      "What is one thing you're grateful for in nature?",
      "What is one thing you're grateful for in your relationships?",
      "What is one thing you're grateful for in your work?",
      "What is one thing you're grateful for in your health?",
      "What is one thing you're grateful for in your community?",
      "What is one thing you're grateful for in your spirituality?",
      "What is one thing you're grateful for in your creativity?",
      "What is one thing you're grateful for in your hobbies?",
      "What is one thing you're grateful for in your education?",
      "What is one thing you're grateful for in your family?",
      "What is one thing you're grateful for in your friends?",
      "What is one thing you're grateful for in your pets?",
      "What is one thing you're grateful for in your home?",
      "What is one thing you're grateful for in your food?",
      "What is one thing you're grateful for in your sleep?",
      "What is one thing you're grateful for in your body?",
      "What is one thing you're grateful for in your mind?",
      "What is one thing you're grateful for in your soul?",
      "What is one thing you're grateful for in your spirit?",
      "What is one thing you're grateful for in your heart?",
      "What is one thing you're grateful for in your intuition?",
      "What is one thing you're grateful for in your creativity?",
      "What is one thing you're grateful for in your imagination?",
      "What is one thing you're grateful for in your dreams?",
      "What is one thing you're grateful for in your hopes?",
      "What is one thing you're grateful for in your wishes?",
      "What is one thing you're grateful for in your goals?",
      "What is one thing you're grateful for in your aspirations?",
      "What is one thing you're grateful for in your intentions?",
      "What is one thing you're grateful for in your commitment?",
      "What is one thing you're grateful for in your perseverance?",
      "What is one thing you're grateful for in your resilience?",
      "What is one thing you're grateful for in your strength?",
      "What is one thing you're grateful for in your courage?",
      "What is one thing you're grateful for in your kindness?",
      "What is one thing you're grateful for in your compassion?",
      "What is one thing you're grateful for in your empathy?",
      "What is one thing you're grateful for in your love?",
      "What is one thing you're grateful for in your joy?",
      "What is one thing you're grateful for in your peace?",
      "What is one thing you're grateful for in your happiness?",
      "What is one thing you're grateful for in your contentment?",
      "What is one thing you're grateful for in your abundance?",
      "What is one thing you're grateful for in your prosperity?",
      "What is one thing you're grateful for in your success?"
    ];
    $scope.currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  };

  // Save note
  $scope.saveNote = function () {
    const note = {
      content: $scope.newNote.content,
      category: $scope.newNote.category,
      date: $scope.entryDate,
      mood: $scope.selectedMood,
    };
    $scope.notes.push(note);
    localStorage.setItem("notes", JSON.stringify($scope.notes));
    $scope.newNote = {};
    $scope.filterNotesByDate();
  };

  // Filter notes by date
  $scope.filterNotesByDate = function () {
    $scope.filteredNotes = $scope.notes.filter(
      (note) => note.date === $scope.entryDate
    );
  };

  // Delete note
  $scope.deleteNote = function (index) {
    $scope.notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify($scope.notes));
    $scope.filterNotesByDate();
  };

  // Set mood
  $scope.setMood = function (mood) {
    $scope.selectedMood = mood;
  };

  // Export notes to PDF
  $scope.exportNotesToPDF = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Your Notes", 10, 10);

    $scope.filteredNotes.forEach((note, index) => {
      const startY = 20 + index * 30;
      doc.setFontSize(10);
      doc.text(`Date: ${note.date}`, 10, startY);
      doc.text(`Mood: ${note.mood || "None"}`, 10, startY + 10);
      doc.text(`Category: ${note.category}`, 10, startY + 20);
      doc.text("Content:", 10, startY + 30);
      doc.text(note.content, 20, startY + 40, { maxWidth: 180 });
    });

    doc.save("notes.pdf");
  };

  // Import notes
  $scope.importNotes = function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        $scope.notes = JSON.parse(e.target.result);
        localStorage.setItem("notes", JSON.stringify($scope.notes));
        $scope.filterNotesByDate();
        $scope.$apply();
      };
      reader.readAsText(file);
    }
  };

  // Initialize filtered notes for the current date
  $scope.filterNotesByDate();
});
