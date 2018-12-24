const reasons = [
    {
        id: 1,
        name: "发明人变更",
        child: [
            {
                id: 101,
                name: "发明人变更》第一发明人国籍",
                child: [
                    {
                        id: 1011, name: "变更发明人国籍的声明", child: [{
                            id: 10111,
                            name: "发明人",
                            child: {
                                serial: [{id: 101111, name: "序号"}],
                                fields: [
                                    {id: 101112, name: "姓名或名称"},
                                    {id: 101113, name: "变更前国籍", citizenship: true},
                                    {id: 101114, name: "变更后国籍", citizenship: true}
                                ]
                            }
                        }]
                    },
                    {
                        id: 1012, name: "身份证明文件复印件", child: [{
                            id: 10121,
                            name: "人员信息",
                            child: {
                                serial: [{id: 101211, name: "序号"}],
                                fields: [
                                    {id: 101212, name: "姓名或名称"},
                                    {id: 101213, name: "身份证明文件号码"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 102,
                name: "发明人变更》第一发明人身份证明文件号码",
                child: [
                    {
                        id: 1021, name: "身份证明文件复印件", child: [{
                            id: 10211,
                            name: "人员信息",
                            child: {
                                serial: [{id: 102111, name: "序号"}],
                                fields: [
                                    {id: 102112, name: "姓名或名称"},
                                    {id: 102113, name: "身份证明文件号码"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 103,
                name: "发明人变更》发明人姓名》姓名书写错误",
                child: [
                    {
                        id: 1031, name: "变更发明人声明（姓名书写错误）", child: [{
                            id: 10311,
                            name: "发明人",
                            child: {
                                serial: [{id: 103111, name: "序号"}],
                                fields: [
                                    {id: 103112, name: "变更前姓名"},
                                    {id: 103113, name: "变更后姓名"}
                                ]
                            }
                        }]
                    },
                    {
                        id: 1032, name: "身份证明文件复印件", child: [{
                            id: 10321,
                            name: "人员信息",
                            child: {
                                serial: [{id: 103211, name: "序号"}],
                                fields: [
                                    {id: 103212, name: "姓名或名称"},
                                    {id: 103213, name: "身份证明文件号码"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 104,
                name: "发明人变更》发明人姓名》更改中文译名",
                child: [
                    {
                        id: 1041, name: "变更发明人声明（更改中文译名）", child: [{
                            id: 10411,
                            name: "发明人",
                            child: {
                                serial: [{id: 104111, name: "序号"}],
                                fields: [
                                    {id: 104112, name: "变更前姓名"},
                                    {id: 104113, name: "变更后姓名"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 105,
                name: "发明人变更》发明人姓名》漏报、错报发明人",
                child: [
                    {
                        id: 1051, name: "变更发明人声明（错报或漏报发明人）", child: [
                            {
                                id: 10511,
                                name: "变更前发明人",
                                child: {
                                    serial: [{id: 105111, name: "序号"}],
                                    fields: [{id: 105112, name: "变更前姓名"}]
                                }
                            },
                            {
                                id: 10512,
                                name: "变更后发明人",
                                child: {
                                    serial: [{id: 105121, name: "序号"}],
                                    fields: [{id: 105122, name: "变更后姓名"}]
                                }
                            },
                            {
                                id: 10513,
                                name: "申请人或专利权人（发明）",
                                child: {
                                    serial: [{id: 105131, name: "序号"}],
                                    fields: [{id: 105132, name: "变更前姓名"}]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 106,
                name: "发明人变更》发明人姓名》其他",
                child: [
                    {
                        id: 1061, name: "其他证明文件（发明人）", child: [
                            {
                                id: 10611,
                                name: "变更前发明人",
                                child: {
                                    serial: [{id: 106111, name: "序号"}],
                                    fields: [{id: 106112, name: "变更前姓名"}]
                                }
                            },
                            {
                                id: 10612,
                                name: "变更后发明人",
                                child: {
                                    serial: [{id: 106121, name: "序号"}],
                                    fields: [{id: 106122, name: "变更后姓名"}]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 107,
                name: "发明人变更》发明人顺序》发明人顺序错误",
                child: [
                    {
                        id: 1071, name: "变更发明人声明（错报或漏报发明人）", child: [
                            {
                                id: 10711,
                                name: "变更前发明人",
                                child: {
                                    serial: [{id: 107111, name: "序号"}],
                                    fields: [{id: 107112, name: "变更前姓名"}]
                                }
                            },
                            {
                                id: 10712,
                                name: "变更后发明人",
                                child: {
                                    serial: [{id: 107121, name: "序号"}],
                                    fields: [{id: 107122, name: "变更后姓名"}]
                                }
                            },
                            {
                                id: 10713,
                                name: "申请人或专利权人（发明）",
                                child: {
                                    serial: [{id: 107131, name: "序号"}],
                                    fields: [{id: 107132, name: "变更前姓名"}]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "申请人/专利权人变更",
        child: [
            {
                id: 201,
                name: "申请人/专利权人变更》更名》个人更名》姓名书写错误",
                child: [
                    {
                        id: 2011, name: "变更申请人声明（个人更名）", child: [{
                            id: 20111,
                            name: "申请人或专利权人",
                            child: {
                                serial: [{id: 201111, name: "序号"}],
                                fields: [
                                    {id: 201113, name: "更名前名称"},
                                    {id: 201114, name: "更名后名称"}
                                ]
                            }
                        }]
                    },
                    {
                        id: 2012, name: "身份证明文件复印件", child: [{
                            id: 20121,
                            name: "姓名",
                            child: {
                                serial: [{id: 201211, name: "序号"}],
                                fields: [
                                    {id: 201212, name: "姓名或名称"},
                                    {id: 201213, name: "身份证明文件号码"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 202,
                name: "申请人/专利权人变更》更名》个人更名》更改姓名",
                child: [
                    {
                        id: 2021, name: "户籍管理部门出具的证明", child: [{
                            id: 20211,
                            name: "申请人或专利权人",
                            child: {
                                serial: [{id: 202111, name: "序号"}],
                                fields: [
                                    {id: 202113, name: "更名前名称"},
                                    {id: 202114, name: "更名后名称"}
                                ]
                            }
                        }]
                    },
                    {
                        id: 2022, name: "变更申请人声明（个人更名）", child: [{
                            id: 20221,
                            name: "申请人或专利权人",
                            child: {
                                serial: [{id: 202211, name: "序号"}],
                                fields: [
                                    {id: 202212, name: "更名前名称"},
                                    {id: 202213, name: "更名后名称"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 203,
                name: "申请人/专利权人变更》更名》企业更名",
                child: [
                    {
                        id: 2031, name: "工商管理部门出具的企业更名证明", isSign: 1, child: [{
                            id: 20311,
                            name: "申请人或专利权人",
                            child: {
                                serial: [{id: 203111, name: "序号"}],
                                fields: [
                                    {id: 203113, name: "更名前名称"},
                                    {id: 203114, name: "更名后名称"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 204,
                name: "申请人/专利权人变更》更名》事业单位或社会团体更名",
                child: [
                    {
                        id: 2041, name: "事业单位或社会团体更名的证明文件", isSign: 1, child: [{
                            id: 20411,
                            name: "申请人或专利权人",
                            child: {
                                serial: [{id: 204111, name: "序号"}],
                                fields: [
                                    {id: 204113, name: "更名前名称"},
                                    {id: 204114, name: "更名后名称"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 205,
                name: "申请人/专利权人变更》更名》机关法人更名",
                child: [
                    {
                        id: 2051, name: "上级主管部门签发的证明文件", isSign: 1, child: [{
                            id: 20511,
                            name: "申请人或专利权人",
                            child: {
                                serial: [{id: 205111, name: "序号"}],
                                fields: [
                                    {id: 205113, name: "更名前名称"},
                                    {id: 205114, name: "更名后名称"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 206,
                name: "申请人/专利权人变更》更名》外国人、外国企业或者外国其他组织更改中文译名",
                child: [
                    {
                        id: 2061, name: "关于改正译名错误的声明", child: [{
                            id: 20611,
                            name: "申请人或专利权人",
                            child: {
                                serial: [{id: 206111, name: "序号"}],
                                fields: [
                                    {id: 206113, name: "更名前名称"},
                                    {id: 206114, name: "更名后名称"}
                                ]
                            }
                        }]
                    }
                ]
            },
            {
                id: 207,
                name: "申请人/专利权人变更》转让",
                child: [
                    {
                        id: 2071, name: "专利（申请）权转移证明", child: [
                            {
                                id: 20711,
                                name: "转让人",
                                child: {
                                    serial: [{id: 207111, name: "序号"}],
                                    fields: [
                                        {id: 207112, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 20712,
                                name: "受让人",
                                child: {
                                    serial: [{id: 207121, name: "序号"}],
                                    fields: [
                                        {id: 207123, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 208,
                name: "申请人/专利权人变更》涉及技术出口的转让》主管部门证明",
                child: [
                    {
                        id: 2081,
                        name: "商务部门出具的技术出口证明",
                        isSign: 1,
                        child: [
                            {
                                id: 20811,
                                name: "技术进口方",
                                child: {
                                    serial: [{id: 208111, name: "序号"}],
                                    fields: [
                                        {id: 208112, name: "更名后名称"},
                                    ]
                                }
                            },
                            {
                                id: 20812,
                                name: "技术提供方",
                                child: {
                                    serial: [{id: 208121, name: "序号"}],
                                    fields: [
                                        {id: 208123, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 20813,
                                name: "技术出口方",
                                child: {
                                    serial: [{id: 208131, name: "序号"}],
                                    fields: [
                                        {id: 208133, name: "技术出口方"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 209,
                name: "申请人/专利权人变更》涉及技术出口的转让》转让合同",
                child: [
                    {
                        id: 2091,
                        name: "专利（申请）权转移证明",
                        child: [
                            {
                                id: 20911,
                                name: "转让人",
                                child: {
                                    serial: [{id: 209111, name: "序号"}],
                                    fields: [
                                        {id: 209112, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 20912,
                                name: "受让人",
                                child: {
                                    serial: [{id: 209121, name: "序号"}],
                                    fields: [
                                        {id: 209123, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 210,
                name: "申请人/专利权人变更》赠与",
                child: [
                    {
                        id: 2101,
                        name: "双方当事人签字或者盖章的赠与合同",
                        child: [
                            {
                                id: 21011,
                                name: "赠与人",
                                child: {
                                    serial: [{id: 210111, name: "序号"}],
                                    fields: [
                                        {id: 210112, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 21012,
                                name: "受赠人",
                                child: {
                                    serial: [{id: 210121, name: "序号"}],
                                    fields: [
                                        {id: 210123, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 211,
                name: "申请人/专利权人变更》继承",
                child: [
                    {
                        id: 2111,
                        name: "继承人合法地位的公证书",
                        isSign: 1,
                        child: [
                            {
                                id: 21111,
                                name: "被继承人",
                                child: {
                                    serial: [{id: 211111, name: "序号"}],
                                    fields: [
                                        {id: 211112, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 21112,
                                name: "继承人",
                                child: {
                                    serial: [{id: 211121, name: "序号"}],
                                    fields: [
                                        {id: 211123, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 212,
                name: "申请人/专利权人变更》企业合并或分立",
                child: [
                    {
                        id: 2121,
                        name: "有关公司合并或分立的证明文件",
                        isSign: 1,
                        child: [
                            {
                                id: 21211,
                                name: "申请人或专利权人合并/分立",
                                child: {
                                    serial: [{id: 212111, name: "序号"}],
                                    fields: [
                                        {id: 212112, name: "更名前名称"},
                                        {id: 212113, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 213,
                name: "申请人/专利权人变更》企业注销",
                child: [
                    {
                        id: 2131,
                        name: "企业注销的证明文件",
                        isSign: 1,
                        child: [
                            {
                                id: 21311,
                                name: "被注销方",
                                child: {
                                    serial: [{id: 213111, name: "序号"}],
                                    fields: [
                                        {id: 213112, name: "更名前名称"},
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        id: 2132,
                        name: "专利（申请）权转移证明",
                        child: [
                            {
                                id: 21321,
                                name: "转让人",
                                child: {
                                    serial: [{id: 213111, name: "序号"}],
                                    fields: [
                                        {id: 213112, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 21322,
                                name: "受让人",
                                child: {
                                    serial: [{id: 213221, name: "序号"}],
                                    fields: [
                                        {id: 213222, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 214,
                name: "申请人/专利权人变更》企业破产拍卖",
                child: [
                    {
                        id: 2141,
                        name: "破产清算的详细财产分配情况证明",
                        isSign: 1,
                        child: [
                            {
                                id: 21411,
                                name: "破产方",
                                child: {
                                    serial: [{id: 213111, name: "序号"}],
                                    fields: [
                                        {id: 213112, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 21412,
                                name: "财产继承方",
                                child: {
                                    serial: [{id: 214121, name: "序号"}],
                                    fields: [
                                        {id: 214122, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 215,
                name: "申请人/专利权人变更》改制或改变组织形式》企业组织形式改变的证明",
                child: [
                    {
                        id: 2151,
                        name: "企业组织形式改变的证明文件",
                        isSign: 1,
                        child: [
                            {
                                id: 21511,
                                name: "申请人或专利权人",
                                child: {
                                    serial: [{id: 215111, name: "序号"}],
                                    fields: [
                                        {id: 215112, name: "更名前名称"},
                                        {id: 215113, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 216,
                name: "申请人/专利权人变更》改制或改变组织形式》改变企业组织形式的批示等",
                child: [
                    {
                        id: 2161,
                        name: "改变企业组织形式的批示",
                        isSign: 1,
                        child: [
                            {
                                id: 21611,
                                name: "申请人或专利权人",
                                child: {
                                    serial: [{id: 216111, name: "序号"}],
                                    fields: [
                                        {id: 216112, name: "更名前名称"},
                                        {id: 216113, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        id: 2162,
                        name: "加盖变更后企业公章的企业营业执照复印件",
                        isSign: 1,
                        child: [
                            {
                                id: 21621,
                                name: "申请人或专利权人",
                                child: {
                                    serial: [{id: 216211, name: "序号"}],
                                    fields: [
                                        {id: 216212, name: "更名前名称"},
                                        {id: 216213, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 217,
                name: "申请人/专利权人变更》其他",
                child: [
                    {
                        id: 2171,
                        name: "其他证明文件（申请人）",
                        isSign: 2,
                        child: [
                            {
                                id: 21711,
                                name: "变更前申请人",
                                child: {
                                    serial: [{id: 217111, name: "序号"}],
                                    fields: [
                                        {id: 217112, name: "更名前名称"},
                                    ]
                                }
                            },
                            {
                                id: 21712,
                                name: "变更后申请人",
                                child: {
                                    serial: [{id: 217121, name: "序号"}],
                                    fields: [
                                        {id: 217122, name: "更名后名称"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 218,
                name: "申请人/专利权人变更》国籍/注册国家（地区）填写错误",
                child: [
                    {
                        id: 2181,
                        name: "变更申请人国籍的声明",
                        child: [
                            {
                                id: 21811,
                                name: "申请人或专利权人",
                                child: {
                                    serial: [{id: 218111, name: "序号"}],
                                    fields: [
                                        {id: 218112, name: "姓名或名称"},
                                        {id: 218113, name: "变更前国籍"},
                                        {id: 218114, name: "变更后国籍"},
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        id: 2182,
                        name: "身份证明文件复印件",
                        child: [
                            {
                                id: 21821,
                                name: "姓名",
                                child: {
                                    serial: [{id: 218211, name: "序号"}],
                                    fields: [
                                        {id: 218212, name: "姓名或名称"},
                                        {id: 218213, name: "身份证明文件号码"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 219,
                name: "申请人/专利权人变更》国籍/注册国家（地区）变更",
                child: [
                    {
                        id: 2191,
                        name: "身份证明文件的公证文件",
                        isSign: 1,
                        child: [
                            {
                                id: 21911,
                                name: "申请人或专利权人",
                                child: {
                                    serial: [{id: 219111, name: "序号"}],
                                    fields: [
                                        {id: 219112, name: "姓名或名称"},
                                        {id: 219113, name: "身份证明文件号码"},
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        id: 2192,
                        name: "变更申请人国籍的声明",
                        child: [
                            {
                                id: 21921,
                                name: "申请人或专利权人",
                                child: {
                                    serial: [{id: 219211, name: "序号"}],
                                    fields: [
                                        {id: 219212, name: "姓名或名称"},
                                        {id: 219213, name: "变更前国籍"},
                                        {id: 219214, name: "变更后国籍"},
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        id: 2193,
                        name: "身份证明文件复印件",
                        child: [
                            {
                                id: 21931,
                                name: "姓名",
                                child: {
                                    serial: [{id: 219311, name: "序号"}],
                                    fields: [
                                        {id: 219312, name: "姓名或名称"},
                                        {id: 219313, name: "身份证明文件号码"},
                                    ]
                                }
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        id: 3,
        name: "专利代理机构/代理人变更",
        child: [
            {
                id: 301,
                name: "专利代理机构/代理人变更》解除/辞去委托",
                child: [
                    {
                        id: 3011, name: "解除/辞去委托证明", child: [
                            {
                                id: 30111,
                                name: "委托信息",
                                child: {
                                    serial: [{id: 301111, name: "专利代理机构代码"}],
                                    fields: [{id: 301112, name: "专利代理机构名称"}]
                                }
                            },
                            {
                                id: 30112,
                                name: "申请人或专利权人（代理）",
                                child: {
                                    serial: [{id: 301121, name: "序号"}],
                                    fields: [{id: 301122, name: "姓名或名称"}]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                id: 302,
                name: "专利代理机构/代理人变更》变更代理机构",
                child: [
                    {
                        id: 3021, name: "解除/辞去委托证明", child: [
                            {
                                id: 30211,
                                name: "委托信息",
                                child: {
                                    serial: [{id: 302111, name: "专利代理机构代码"}],
                                    fields: [{id: 302112, name: "专利代理机构名称"}]
                                }
                            },
                            {
                                id: 30212,
                                name: "申请人或专利权人（代理）",
                                child: {
                                    serial: [{id: 302121, name: "序号"}],
                                    fields: [{id: 302122, name: "姓名或名称"}]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
export default reasons
