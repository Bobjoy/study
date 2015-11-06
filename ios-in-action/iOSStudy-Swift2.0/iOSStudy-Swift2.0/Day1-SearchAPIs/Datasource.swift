//
//  Datasource.swift
//  iOSStudy-Swift2.0
//
//  Created by Vetech on 15/11/3.
//  Copyright © 2015年 BFL. All rights reserved.
//

import UIKit
import CoreSpotlight

class Datasource: NSObject {

    var people: [Person]
    
    override init () {
        let becky = Person()
        becky.name = "Becky"
        becky.id = "1"
        becky.image = UIImage(named: "becky")!
        
        let ben = Person()
        ben.name = "Ben"
        ben.id = "2"
        ben.image = UIImage(named: "ben")!
        
        let jane = Person()
        jane.name = "Jane"
        jane.id = "3"
        jane.image = UIImage(named: "jane")!
    }
    
    func friendFromID(id: String) -> Person? {
        for person in people {
            if person.id == id {
                return person
            }
        }
        return nil
    }
}
