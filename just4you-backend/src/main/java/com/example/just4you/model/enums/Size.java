package com.example.just4you.model.enums;

public enum Size {
    XXS,
    XS,
    S,
    M,
    L,
    XL,
    XXL;


    public static Size getSize(int x) {
        switch(x) {
            case 1:
                return XXS;
            case 2:
                return XS;
            case 3:
                return S;
            case 4:
                return M;
            case 5:
                return L;
            case 6:
                return XL;
            case 7:
                return XXL;
            default:
                return null;
        }
    }
}
