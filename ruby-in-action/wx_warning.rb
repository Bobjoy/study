#!/usr/bin/env ruby
def warning
    VcoolineLog::Weixinpay.add(params)
    render text: 'success'
end