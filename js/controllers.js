'use strict';

/* Controllers */

angular.module('tipCalculator.controllers', []).
    controller('HomeCtrl', ["$scope", function($scope) {
        var DEFAULT_TIP_PERCENT = 15;

        var ROUND_UP = 1,
            ROUND_DOWN = -1,
            ROUND_NONE = 0;

        $scope.vm = {
            roundMode: ROUND_NONE,
            billTotal: undefined,
            tipPercent: DEFAULT_TIP_PERCENT,
            splitNum: 1,

            totalTip: totalTip,
            totalToPay: totalToPay,
            tipPerPerson: tipPerPerson,
            totalPerPerson: totalPerPerson,

            roundUp: roundUp,
            roundDown: roundDown
        };

        function billTotalAsNumber() {
            return $scope.vm.billTotal || 0;
        }

        function totalTip() {
            return 0.01 * $scope.vm.tipPercent * billTotalAsNumber();
        }

        function tipPerPerson() {
            return totalTip() / $scope.vm.splitNum;
        }

        function totalPerPerson() {
            return (totalTip() + billTotalAsNumber()) / $scope.vm.splitNum;
        }

        function totalToPay() {
            var value = totalTip() + billTotalAsNumber();

            switch($scope.vm.roundMode) {
                case ROUND_DOWN:
                    if(Math.floor(value) >= billTotalAsNumber())
                        return Math.floor(value);
                    return value;

                case ROUND_UP:
                    return Math.ceil(value);

                default:
                    return value;
            }
        }

        function roundUp() {
            $scope.vm.roundMode = ROUND_UP;
        }

        function roundDown() {
            $scope.vm.roundMode = ROUND_DOWN;
        }

        function resetRoundMode(newValue, oldValue) {
            if (newValue === oldValue)
                return;

            $scope.vm.roundMode = ROUND_NONE;
        };

        $scope.$watch('vm.billTotal', resetRoundMode);
        $scope.$watch('vm.tipPercent', resetRoundMode);
        $scope.$watch('vm.splitNum', resetRoundMode);

        $scope.$on('$routeChangeSuccess', function() {
            $('#billTotalInput').data('dxNumberBox').focus();
        });

    }]);