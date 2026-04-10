import os
from PIL import Image
import glob

def resize_large_images(root_dir, width_threshold=2000, scale_factor=0.5):
    """
    指定されたディレクトリ以下の PNG 画像を走査し、
    横幅が threshold を超えるものを scale_factor 倍にリサイズします。
    対象ディレクトリ: website/docs/*_ts/picture および website/docs/*_cs/picture
    """
    # 探索パターンの定義
    patterns = [
        os.path.join(root_dir, "website", "docs", "*_ts", "picture", "*.png"),
        os.path.join(root_dir, "website", "docs", "*_cs", "picture", "*.png")
    ]
    
    target_files = []
    for pattern in patterns:
        target_files.extend(glob.glob(pattern))

    if not target_files:
        print("対象となる PNG ファイルが見つかりませんでした。")
        return

    print(f"合計 {len(target_files)} 個のファイルをチェックします...")

    modified_count = 0
    for file_path in target_files:
        try:
            with Image.open(file_path) as img:
                width, height = img.size
                if width > width_threshold:
                    new_width = int(width * scale_factor)
                    new_height = int(height * scale_factor)
                    
                    print(f"リサイズ中: {file_path} ({width}x{height} -> {new_width}x{new_height})")
                    
                    # リサイズ実行
                    resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    # 保存 (上書き)
                    resized_img.save(file_path)
                    modified_count += 1
        except Exception as e:
            print(f"エラー発生: {file_path} - {e}")

    print(f"完了: {modified_count} 個の画像をリサイズしました。")

if __name__ == "__main__":
    # カレントディレクトリをプロジェクトルートとして実行
    project_root = os.getcwd()
    resize_large_images(project_root)
