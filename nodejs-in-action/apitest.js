var method = function (obj) {
    console.log("We are in a subthread now.");
    console.log("Argument passed from the main thread: ", obj);
    console.log("subthread index: ", process.threadId);
    console.log("am i really a subthread?: ", process.subThread);
    return { someResult: "some result" };
};

jxcore.tasks.addTask(method, {count: 1000}, function (err, result) {
    // this block of code executes back in the main thread,
    // after method() completes.
    console.log("This is result from subthreaded method:", result);
});