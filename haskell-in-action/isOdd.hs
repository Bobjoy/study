import System.IO

prompt::String->IO()
prompt text = do
  putStr text
  hFlush stdout

descOddEven::Int->String
descOddEven number =
  if number `mod` 2 == 0 then "偶数" else "奇数"

main = do
    prompt "请输入整数"
    input <- getLine
    let desc = descOddEven (read input::Int)
    putStrLn(input ++ "是" ++ desc ++ "!")
