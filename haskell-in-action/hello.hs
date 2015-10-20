import System.IO

main = do putStr "请输入你的姓名:"
          hFlush stdout
          name <- getLine
          putStrLn("Hello " ++ name ++ "!")
