/**
 * Created by andrey on 01.10.15.
 */
/*
 Плагин прототипа Function, позволяющий добавлять строгую типизацию функциям
 Функция type принимает ожидаемые типы аргументов функции
 Для корректной работы функции type необходимо последним атрибутом передавать
 контекст функции (в случае, если функция не использует контекст объекта, передавать null)
 Примеры использования функции type:
    var sum = function (a,b) {
        return a + b;
    }.type(Number, Number, null);

    var object = {id:2}
    object.sum = function (b) {
        return this.id + b;
    }.type(Number, object);
 */
Function.prototype.type = function () {
    var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
    var context = arguments[arguments.length - 1];
    var curFunc = this;

    return function () {
        var funcArgs = Array.prototype.slice.call(arguments, 0);
        funcArgs = funcArgs.map(function (value) {
            return new Object(value);
        });
        var state = true;
        funcArgs.forEach(function (arg, i) {
            state = state && arg instanceof args[i];
        });
        if (state) {
            return curFunc.apply(context, funcArgs)
        } else {
            throw new Error("invalid argument types");
        }

    };
};