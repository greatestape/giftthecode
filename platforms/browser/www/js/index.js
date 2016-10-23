/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.startSurvey();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    questions: {
        '1': {text: "What's your name?", type: "freeform"},
        '2': {text: "Do you know why you're at Holland Bloorview?", type:"yesno"}, 
        '2.1': {text: "Can you tell us why?", type: "freeform"},
    },

    questionSequence: ["1", "2", "2.1"],

    currentQuestion: 0,

    answers: {},

    startSurvey: function() {
      app.showQuestion()
    },

    showQuestion: function() {
      question = app.questions[app.questionSequence[app.currentQuestion]]
      div = document.getElementById("survey")
      div.innerHTML = "<p>" + question.text + "</p>"
      div.innerHTML += app.generateAnswerInputs(question)
    },

    generateAnswerInputs: function(question) {
      switch(question.type) {
        case "freeform":
          return "<form onsubmit=\"app.takeTextAnswer(this, 'freeform-input'); return false\"><input id=\"freeform-input\" /><input type=\"submit\" value=\"Done\" /></form>"
          break
        case "yesno":
          return "<button onclick=\"app.takeButtonAnswer(this, 'yes')\">Yes</button>" + 
            "<button onclick=\"app.takeButtonAnswer(this, 'no')\">No</button>"
          break
      }
    },

    takeTextAnswer: function(event, inputId) {
      app.answers[app.questionSequence[app.currentQuestion]] = document.getElementById(inputId).value
      app.advanceToNextQuestion()
    },

    takeButtonAnswer: function(event, answer) {
      app.answers[app.questionSequence[app.currentQuestion]] = answer
      app.advanceToNextQuestion()
    },

    advanceToNextQuestion: function() {
      var src = 'tron.wav'
      var mediaSuccess = function() {
      }
      var mediaError = function(error) {
        alert("Error: " + error.code + " " + error.message)
      }
      var mediaStatus = function(stuff) {
      }
      console.log("about to prep media")
      var media = new Media(src, mediaSuccess, mediaError, mediaStatus);
      console.log("prepped media")
      media.play()
      app.currentQuestion++
      if (app.currentQuestion >= app.questionSequence.length) {
        console.log(app.answers)
        alert("Out of questions!")
      } else {
        app.showQuestion()
      }
    },
};
