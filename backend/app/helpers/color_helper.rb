module ColorHelper
    def color_similarity(color1, color2)
      rgb1 = hex_to_rgb(color1)
      rgb2 = hex_to_rgb(color2)
  
      r_diff = (rgb1[0] - rgb2[0]).abs
      g_diff = (rgb1[1] - rgb2[1]).abs
      b_diff = (rgb1[2] - rgb2[2]).abs
  
      r_diff + g_diff + b_diff
    end
  
    private
  
    def hex_to_rgb(hex)
      hex = hex.gsub('#', '')
      [hex[0..1].hex, hex[2..3].hex, hex[4..5].hex]
    end
  end