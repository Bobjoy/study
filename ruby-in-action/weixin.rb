#!/usr/bin/env ruby
def payfeedback
    VcoolineLog::Weixinpay.add(params)
    xml = params[:xml]
    wx_user = WxUser.where(uid: xml['OpenId']).first
    mp_user = WxMpUser.where(app_id: xml['AppId']).first
    feedback = WxFeedback.where(feed_back_id: xml['FeedBackId']).first || WxFeedback.new
    msg_type = WxFeedback.msg_type_status xml['MsgType']
    if msg_type == 0
      attrs = {wx_user_id: wx_user.id, supplier_id: mp_user.try{:supplier}.try{:id},           wx_mp_user_id: mp_user.id, feed_back_id: xml['FeedBackId'], msg_type:msg_type,
               trans_id: xml['TransId'], reason: xml['Reason'], solution: xml['Solution'], ext_info: xml['ExtInfo'],pic_info: xml['PicInfo']}
    else
      attrs = {wx_user_id: wx_user.id, supplier_id: mp_user.supplier.id, wx_mp_user_id: mp_user.id, feed_back_id: xml['FeedBackId'], msg_type:msg_type,
               trans_id: xml['TransId'].to_s, reason: xml['Reason']}
      #attrs = {msg_type: msg_type, reason: xml['Reason']}
    end
    feedback.attributes = attrs
    if feedback.save
      render text: 'success'
    else
      render text: 'faild'
    end
    rescue => e
    VcoolineLog::Weixinpay.add("feedback error -> #{e}")
    render :text => e
end