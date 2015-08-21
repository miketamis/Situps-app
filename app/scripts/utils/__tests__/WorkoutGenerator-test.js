jest.dontMock('../WorkoutGenerator');

describe('WorkoutGenerator', function() {
    function totalSitups(workout) {
        var total_amount = 0;
        for(var j in workout) {
            if(workout[j].type === 'situps') {
                expect(workout[j].amount).toBeGreaterThan(0);
                total_amount += workout[j].amount;
            }
        }
        return total_amount;
    }

    var WorkoutGenerator = require('../WorkoutGenerator');
    describe('generateWorkout', function() {
        it('Throws an error if the age is invalid', function() {
            var invalid_ages = [-1, 3, 1.5];
            invalid_ages.forEach(function(age) {
                expect(function() {
                    WorkoutGenerator.generateWorkout(10, age);
                }).toThrow('Invalid Age');
            });
        });

        it('Throws an error if the level is invalid', function() {
            var invalid_levels = [-1, 1.5];
            invalid_levels.forEach(function(level) {
                expect(function() {
                    WorkoutGenerator.generateWorkout(level, 2);
                }).toThrow('Invalid Level');
            });
        });

        it('the number of situps require per workout increase as the level does', function() {
            for(var k = 0; k <= 2; k++) {
                var previous_total_amount = 0;
                var previous_difference = 0;
                for(var i = 1; i < 100; i++) {
                    var workout = WorkoutGenerator.generateWorkout(i, k);
                    var total_amount = totalSitups(workout);
                    expect(total_amount).toBeGreaterThan(previous_total_amount,
                         'this is level: ' + i + ' age: ' + k);
                    var different = previous_total_amount - total_amount;
                    expect(different - previous_difference).toBeLessThan(10);
                    previous_total_amount = total_amount;
                    previous_difference = different;
                }
            }
        });

        it('Lower ages get harder workouts', function() {
            for(var i = 1; i < 100; i++) {
                var previous_total_amount = 0;
                for(var k = 2; k >= 0; k--) {
                    var workout = WorkoutGenerator.generateWorkout(i, k);
                    var total_amount = totalSitups(workout);
                    expect(total_amount >= previous_total_amount).toBeTruthy(
                         'this is level: ' + i + ' age: ' + k);
                    previous_total_amount = total_amount;
                }
            }
        });
    });

    describe('calculateLevel', function() {
        it('Throws an error if the age is invalid', function() {
            var invalid_ages = [-1, 3, 1.5];
            invalid_ages.forEach(function(age) {
                expect(function() {
                    WorkoutGenerator.calculateLevel(10, age);
                }).toThrow('Invalid Age');
            });
        });

        it('Throws an error if the amount is invalid', function() {
            var invalid_amount = [-1, 1.5];
            invalid_amount.forEach(function(amount) {
                expect(function() {
                    WorkoutGenerator.calculateLevel(amount, 2);
                }).toThrow('Invalid Amount');
            });
        });

        it('to return a good esimate of level', function() {
            for(var k = 0; k <= 2; k++) {
                for(var i = 1; i < 300; i++) {
                    var level = WorkoutGenerator.calculateLevel(i, k);
                    var workout = WorkoutGenerator.generateWorkout(level, k);
                    var total_amount = totalSitups(workout);
                    expect(total_amount).toBeGreaterThan(i);
                    expect(total_amount / 2 - 10).not.toBeGreaterThan(i);
                }
            }
        });
    });

});
